.. note:: How Do We Know Which Projects a User Can Access?
   
   The :ref:`backend you imported
   <tutorial-task-tracker-create-realm-app>` makes exactly one custom
   user data object for each user upon signup. This custom user data
   object contains a list of :ref:`partitions <partitioning>` a user can
   read and a list of partitions a user can write to.
   
   The backend is set up so that every user has read-only access to
   their own custom user data object. The backend also has functions to
   add and remove access to projects, which we will use later when we
   add the Manage Team view.

   By managing the custom user data object entirely on the backend and only
   providing read-only access on the client side, we prevent a malicious
   client from granting themselves arbitrary permissions.
