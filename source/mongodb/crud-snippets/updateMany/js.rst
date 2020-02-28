.. code-block:: javascript

   const query = {};
   const update = { "$mul": { "quantity": 10 } };
   const options = { "upsert": false }

   itemsCollection.updateMany(query, update, options)
     .then(result => {
       const { matchedCount, modifiedCount } = result;
       console.log(`Successfully matched ${matchedCount} and modified ${modifiedCount} items.`)
     })
     .catch(err => console.error(`Failed to update items: ${err}`))
