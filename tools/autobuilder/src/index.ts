import {
  AnonymousCredential,
  RemoteMongoClient,
  Stitch,
  Stream,
} from "mongodb-stitch-server-sdk";

const STITCH_APP_ID = "workerpool-boxgs";

const stitchClient = Stitch.initializeDefaultAppClient(STITCH_APP_ID);

type Build = { comMessage?: string[] };

async function nextInStream<T>(
  stream: Stream<T>,
  timeoutMs = 120000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Stream watcher timed out after ${timeoutMs}ms`));
    }, timeoutMs);
    stream.onNext((event) => {
      clearTimeout(timeout);
      stream.close();
      resolve(event);
    });
  });
}

async function main(): Promise<string[] | undefined> {
  await stitchClient.auth.loginWithCredential(new AnonymousCredential());
  const remoteMongoClient = stitchClient.getServiceClient(
    RemoteMongoClient.factory,
    "mongodb-atlas"
  );
  const db = remoteMongoClient.db("pool");
  const collection = db.collection<Build>("queue");
  const { argv } = process;
  const ownerRepoBranch = argv[2];

  if (ownerRepoBranch === undefined) {
    return [`Usage: ${argv[0]} ${argv[1]} <owner/repo/branch>`];
  }

  const [owner, repo, branch] = ownerRepoBranch.split("/");
  if (!owner || !repo || !branch) {
    return [
      `Expected CLI argument in form 'owner/repo/branch', got '${ownerRepoBranch}`,
    ];
  }
  const filter = {
    "payload.repoOwner": owner,
    "payload.repoName": repo,
    "payload.branchName": branch,
  };

  const stream = await collection.watch({
    "fullDocument.payload.repoOwner": owner,
    "fullDocument.payload.repoName": repo,
    "fullDocument.payload.branchName": branch,
  });

  let build: Build | null;
  console.log(`Waiting for update to ${JSON.stringify(filter)}...`);
  try {
    build = (await nextInStream(stream)).fullDocument ?? null;
  } catch (error) {
    console.warn(`Update never received: ${error.message}`);
    console.log("Falling back to findOne.");
    build = await collection.findOne(filter);
  }

  const comMessage = build?.comMessage;
  if (comMessage === undefined) {
    return [`Nothing found for filter: ${JSON.stringify(filter)}`];
  }
  const log = comMessage[0];
  if (log === undefined) {
    console.warn("Log not found!");
    return undefined; // don't fail the PR
  }
  const re = /ERROR.*/g;
  const errors: string[] = [];
  for (let match = re.exec(log); match !== null; match = re.exec(log)) {
    errors.push(match[0]);
  }
  return errors.length > 0 ? errors : undefined;
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .then((errors) => {
    if (errors === undefined) {
      process.exit(0);
    }
    console.error("Encountered the following errors:");
    console.error(errors.join("\n"));
    process.exit(1);
  });
