// :snippet-start: static-render-ex
import * as Realm from "realm-web";

//your Realm API Key should be stored in .env.local, as shown in prior steps
const REALM_API_KEY = process.env.REALM_API_KEY;

const app = new Realm.App({ id: "react-app-yoewz" });

export async function getStaticProps() {
  const apiKey = REALM_API_KEY;
  const credentials = Realm.Credentials.serverApiKey(apiKey);
  let tempUser;
  tempUser = await app.logIn(credentials);
  const user = tempUser;
  console.log("Successfully logged in!", user);

  const mongo = user.mongoClient("mongodb-atlas");
  const plants = mongo.db("tracker").collection("plants");
  const data = await plants.findOne({ name: "daffodil" });
  const json = JSON.parse(JSON.stringify(data));

  // By returning { props: { lily } }, the Blog component
  // will receive `lily` as a prop at build time
  return {
    props: {
      lily: json,
    },
  };
}

export default function Static({ lily }) {
  return (
    <div>
      <h1>Data from Static Rendering</h1>
      <div>
        {lily ? (
          <div>
            <p>{lily.name}</p>
            <p>{lily.color}</p>
          </div>
        ) : (
          "no plant"
        )}
      </div>
    </div>
  );
}
// :snippet-end:
