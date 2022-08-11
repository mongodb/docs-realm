import { useEffect, useState } from "react";
import * as Realm from "realm-web";
import Link from "next/link";

const REALM_API_KEY =
  "Oz4L6VwcAHpYEP2ojbYkjKDsgUjR0jQ3vXGSliAtkA6boTnlXSbeCxuOtJCfO4rc";

//client test
const app = new Realm.App({ id: "react-app-yoewz" });

// Authenticate the user
const plant = {
  name: "lily of the valley",
  sunlight: "full",
  color: "white",
  type: "perennial",
  _partition: "Store 47",
};

async function logInUser(app) {
  // Create an anonymous credential
  const credentials = Realm.Credentials.anonymous();
  const user = await app.logIn(credentials);
  return user;
}

function getPlants(user) {
  const mongo = user.mongoClient("mongodb-atlas");
  const plants = mongo.db("tracker").collection("plants");
  return plants;
}

async function findPlant(plants, name) {
  const lilyOfTheValley = await plants.findOne({ name });
  console.log(lilyOfTheValley);
  return lilyOfTheValley;
}

async function Run() {
  const user = await logInUser(app);
  const plants = getPlants(user);
  const result = await findPlant(plants, "lily of the valley");
  return result;
}
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
export default function Home() {
  const [plant, setPlant] = useState();
  useEffect(() => {
    (async () => {
      await sleep(3000);
      const result = await Run();
      setPlant(result);
    })();
  }, []);
  return (
    <div>
      {plant ? (
        <div>
          <p>{plant.name}</p>
          <p>{plant.color}</p>
        </div>
      ) : (
        "no plant"
      )}
    </div>
  );
}
