.. list-table::
   :header-rows: 1
   :widths: 15 50 35

   * - Provider/Hook
     - Description
     - Example

   * - :realm-react-sdk:`UserProvider <functions/UserProvider.html>`
     - React component that provides a Realm user for the Sync hooks. A
       UserProvider is required for an app to use Sync hooks.
     - See :ref:`UserProvider <react-native-sync-user-provider>`

   * - :realm-react-sdk:`useUser <functions/useUser.html>`
     - Accesses the currently-authenticated Realm user from the ``UserProvider``
       context. The user is stored as React state and will trigger a rerender
       whenever it changes.
     - .. code:: javascript
     
        const user = useUser();
