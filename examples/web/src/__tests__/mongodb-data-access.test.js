// :snippet-start: import-realm-web
import * as Realm from "realm-web";
// :snippet-end:
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });
const CLUSTER_NAME = "mongodb-atlas";
const DATABASE_NAME = "demo_db";
const COLLECTION_NAME = "plants";

describe("Set up MongoDB Client", () => {
  test("instantiate handle", () => {
    // :snippet-start: instantiate-mongo-client
    const mongo = app.currentUser.mongoClient(CLUSTER_NAME);
    const collection = mongo.db(DATABASE_NAME).collection(COLLECTION_NAME);
    // :snippet-end:
    // TODO: basic unit test
  });
});
describe("CRUD operations", () => {
  describe("Create documents", () => {
    test("Insert single document", () => {
      // :snippet-start: insert-single-document
      return;
      // :snippet-end:
    });
    test("Insert multiple documents", () => {
      // :snippet-start: insert-multiple-documents
      return;
      // :snippet-end:
    });
  });
  describe("Read documents", () => {
    test("Find single document", async () => {
      // :snippet-start: find-single-document
      return;
      // :snippet-end:
    });

    test("Find multiple documents", async () => {
      // :snippet-start: find-multiple-documents
      return;
      // :snippet-end:
    });
    test("Count documents in collection", async () => {
      // :snippet-start: count-documents-in-collection
      return;
      // :snippet-end:
    });
  });
  describe("Update documents", () => {
    test("Update single document", async () => {
      // :snippet-start: update-single-document
      return;
      // :snippet-end:
    });

    test("Update multiple documents", async () => {
      // :snippet-start: update-multiple-documents
      return;
      // :snippet-end:
    });
    test("Upsert documents", async () => {
      // :snippet-start: upsert-documents
      return;
      // :snippet-end:
    });
  });
  describe("Delete documents", () => {
    test("Delete single document", async () => {
      // :snippet-start: delete-single-document
      return;
      // :snippet-end:
    });
    test("Delete multiple documents", async () => {
      // :snippet-start: delete-multiple-documents
      return;
      // :snippet-end:
    });
  });
});
describe("Watch for changes", () => {
  test("Watch for changes in a collection", async () => {
    // :snippet-start: watch-for-changes
    return;
    // :snippet-end:
  });
  test("Watch for changes in a collection with a filter", async () => {
    // :snippet-start: watch-for-changes-with-filter
    return;
    // :snippet-end:
  });
});

describe("Aggregate documents", () => {
  test("Basic aggregation", async () => {
    // :snippet-start: basic-aggregation
    return;
    // :snippet-end:
  });
});

// TODO: refactor docs to make aggregation stages examples testable
