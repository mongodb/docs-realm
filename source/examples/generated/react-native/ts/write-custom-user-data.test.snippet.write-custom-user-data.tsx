import React from 'react';
import {useApp, useUser} from '@realm/react';

function WriteCustomUserData() {
  const user = useUser();

  async function writeCustomUserData(favoriteColor: string) {
    const customUserDataCollection = user
      .mongoClient('mongodb-atlas')
      .db('custom-user-data-database')
      .collection('custom-user-data');

    const filter = {
      userId: user.id, // Query for the user object of the logged in user
    };
    const updateDoc = {
      $set: {
        ...user.customData,
        // Set the logged in user's favorite color
        favoriteColor,
      },
    };
    const options = {upsert: true};

    await customUserDataCollection.updateOne(filter, updateDoc, options);

    // Refresh custom user data once it's been updated on the server
    const customUserData = await user.refreshCustomData();
    console.log(customUserData);
  }
  // ...
}
