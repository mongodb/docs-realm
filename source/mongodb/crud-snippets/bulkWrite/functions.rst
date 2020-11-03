.. code-block:: javascript

    exports = async function(arg){
        const doc1 = { "name": "basketball", "category": "sports", "quantity": 20, "reviews": [] };
        const doc2 = { "name": "football",   "category": "sports", "quantity": 30, "reviews": [] };
    
        var collection = context.services.get("mongodb-atlas").db("foo").collection("bar");
        return await collection.bulkWrite(
        [{ insertOne: doc1}, { insertOne: doc2}], 
        {ordered:true});
    };
