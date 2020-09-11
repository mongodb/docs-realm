.. warning::

   Realms accessed with a given user object only remain valid
   while that user is logged in. As a result, any operation that has not
   yet completed before the initiating user logs out cannot complete
   successfully and will likely result in an error. Any data in a write
   operation that fails in this way will be lost.
