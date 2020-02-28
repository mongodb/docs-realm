.. code-block:: javascript

   const query = { "reviews.0": { "$exists": true } };
   const options = {
     "projection": { "_id": 0 },
     "sort": { "name": 1 }
   };

   itemsCollection.find(query, options).toArray()
     .then(items => {
       console.log(`Successfully found ${items.length} documents.`)
       items.forEach(console.log)
       return items
     })
     .catch(err => console.error(`Failed to find documents: ${err}`))
