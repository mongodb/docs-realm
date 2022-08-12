import { useContext, useEffect, useState } from "react";
import AppServicesContext from "../realm/AppServicesContext";

export default function MongoDbDataAccess() {
  const [plant, setPlant] = useState();
  const app = useContext(AppServicesContext);

  useEffect(() => {
    const user = app.currentUser;
    const mongo = user.mongoClient("mongodb-atlas");
    const plants = mongo.db("example").collection("plants");
    plants.findOne({ name: "lily of the valley" }).then((lily) => {
      console.log(lily);
      setPlant(lily);
    });
  }, [app, app.currentUser, app.currentUser?.id]);
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
