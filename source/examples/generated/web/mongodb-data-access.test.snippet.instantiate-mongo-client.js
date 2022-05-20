const mongo = app.currentUser.mongoClient(CLUSTER_NAME);
const collection = mongo.db(DATABASE_NAME).collection(COLLECTION_NAME);
