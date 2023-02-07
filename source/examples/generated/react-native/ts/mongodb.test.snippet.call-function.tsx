import React from 'react';
import {useUser} from '@realm/react';

type Plant = {
  _id: BSON.ObjectId;
  _partition: string;
  name: string;
  sunlight?: string;
  color?: string;
  type?: string;
};

function QueryPlants() {
  // Get currently logged in user
  const user = useUser();

  const getPlantByName = async (name: string) => {
    // Access linked MongoDB collection
    const mongodb = user!.mongoClient('mongodb-atlas');
    const plants = mongodb.db('example').collection<Plant>('plants');
    // Query the collection
    const response = await plants.findOne({name});

    return response;
  };
  // ...
}
