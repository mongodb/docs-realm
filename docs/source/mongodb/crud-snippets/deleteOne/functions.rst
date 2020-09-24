.. code-block:: javascript

   const query = { "name": "legos" };

   itemsCollection.deleteOne(query)
     .then(result => console.log(`Deleted ${result.deletedCount} item.`))
     .catch(err => console.error(`Delete failed with error: ${err}`))
