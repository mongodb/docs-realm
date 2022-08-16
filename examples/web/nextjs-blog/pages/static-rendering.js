import * as Realm from "realm-web";

const REALM_API_KEY = process.env.REALM_API_KEY;
const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });

export async function getStaticProps() {
  //log in user using realm API key
  const apiKey = REALM_API_KEY;
  const credentials = Realm.Credentials.apiKey(apiKey);
  const user = await app.logIn(credentials);

  //connect to database
  const mongo = user.mongoClient("mongodb-atlas");
  const plants = mongo.db("example").collection("plants");

  //use plants.findOne to query the database
  const data = await plants.findOne({ name: "lily of the valley" });

  //you must parse data as JSON to use it as a prop
  const json = JSON.parse(JSON.stringify(data));
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
