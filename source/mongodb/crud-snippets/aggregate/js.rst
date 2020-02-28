.. code-block:: javascript

   const pipeline = [
     { "$group": {
         "_id": "$customerId",
         "numPurchases": { "$sum": 1 },
         "numItemsPurchased": { "$sum": { "$size": "$items" } }
     } },
     { "$addFields": {
         "averageNumItemsPurchased": {
           "$divide": ["$numItemsPurchased", "$numPurchases"]
         }
     } }
   ]

   purchasesCollection.aggregate(pipeline).toArray()
     .then(categories => {
       console.log(`Successfully grouped purchases for ${categories.length} customers.`)
       for(const category of categories) {
         console.log(`category: ${category._id}`)
         console.log(`num purchases: ${category.numPurchases}`)
         console.log(`total items purchased: ${category.numItemsPurchased}`)
         console.log(`average items per purchase: ${category.averageNumItemsPurchased}`)
       }
       return categories
     })
     .catch(err => console.error(`Failed to group purchases by customer: ${err}`))
