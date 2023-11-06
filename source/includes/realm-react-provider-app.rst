**AppProvider**

.. list-table::
  :header-rows: 1
  :widths: 15 50 35

  * - Provider/Hook
    - Description
    - Example

  * - :realm-react-sdk:`AppProvider <functions/AppProvider.html>`
    - React component that provides an App Services App instance for the
      Sync hooks. An ``AppProvider`` is required for a client to use Sync hooks.
    - See :ref:`AppProvider <react-native-sync-app-provider>`

  * - :realm-react-sdk:`useApp <functions/useApp.html>`
    - Accesses the current App Services App instance from the ``AppProvider``
      context.
    - .. code:: javascript

      const app = useApp();

  * - :realm-react-sdk:`useAuth <functions/useAuth.html>`
    - Provides methods and state for authenticating with an App Services App.
    - .. code:: javascript

      const auth = useAuth();

  * - :realm-react-sdk:`useEmailPasswordAuth <functions/useEmailPasswordAuth.html>`
    - Provides methods and state for authenticating with an App Services App
      using email and password authentication. It also contains utility methods,
      like resetting a password and confirming a user.
    - .. code:: javascript

      const auth = useEmailPasswordAuth();
