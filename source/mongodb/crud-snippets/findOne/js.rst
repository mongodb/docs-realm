.. code-block:: javascript

   const query = { "quantity": { "$gte": 25 } };
   const options = {
     "projection": {
       "title": 1,
       "quantity": 1,
     },
     "sort": { "title": -1 },
   };
   itemsCollection.findOne(query, options)
     .then((result) => {
       if (result) {
         console.log(`Successfully found document: ${result}.`);
       } else {
         console.log('No document matches the provided query.');
       }
     })
     .catch((err) => console.error(`Failed to find document: ${err}`));