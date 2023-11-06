.. list-table::
   :header-rows: 1
   :widths: 15 50 35

   * - Provider/Hook
     - Description
     - Example

   * - :realm-react-sdk:`RealmProvider <functions/RealmProvider.html>`
     - A wrapper that exposes a realm to its child components, which have access
       to hooks that let you read, write, and update data.
     - See :ref:`RealmProvider <react-native-sync-realm-provider>`

   * - :realm-react-sdk:`useRealm <functions/useRealm.html>`
     - Returns the instance of the Realm opened by the RealmProvider.
     - .. code:: javascript
     
        const realm = useRealm();

   * - :realm-react-sdk:`useObject <functions/useObject.html>`
     - Returns an object (``Realm.Object<T>``) from a given type and value of
       primary key. Updates on any changes to the returned object. Returns
       ``null`` if the object either doesn't exists or has been deleted.
     - .. code:: javascript
     
        const myTask = useObject(Task, _id);
      
   * - :realm-react-sdk:`useQuery <functions/useQuery.html>`
     - Returns a collection of objects (``Realm.Results<T & Realm.Object T>``)
       from a given type. Updates on any changes to any object in the
       collection. Returns an empty array if the collection is empty.
     - .. code:: javascript
     
        const tasks = useQuery(Task);
