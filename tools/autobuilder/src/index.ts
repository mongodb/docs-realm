import {
  AnonymousCredential,
  RemoteMongoClient,
  Stitch,
} from "mongodb-stitch-server-sdk";

const STITCH_APP_ID = "workerpool-boxgs";

const stitchClient = Stitch.initializeDefaultAppClient(STITCH_APP_ID);

async function main(): Promise<string[] | undefined> {
  await stitchClient.auth.loginWithCredential(new AnonymousCredential());
  const remoteMongoClient = stitchClient.getServiceClient(
    RemoteMongoClient.factory,
    "mongodb-atlas"
  );
  const db = remoteMongoClient.db("pool");
  const collection = db.collection<{ comMessage?: string[] }>("queue");
  const { argv } = process;
  const newHead = argv[2];

  if (newHead === undefined) {
    return [`Usage: ${argv[0]} ${argv[1]} <commit hash>`];
  }

  const build = await collection
    .find(
      { "payload.newHead": newHead },
      { limit: 100, sort: { createdTime: -1 } }
    )
    .first();
  const comMessage = build?.comMessage;
  if (comMessage === undefined) {
    return [`Commit not found: ${newHead}`];
  }
  const log = comMessage[0];
  if (log === undefined) {
    console.log("Log not found!");
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
