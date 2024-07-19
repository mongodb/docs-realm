#. Open a write transaction with the
   :dotnet-sdk:`Realm.Write() <reference/Realms.Realm.html#Realms_Realm_Write__1_System_Func___0__>`
   or :dotnet-sdk:`Realm.WriteAsync() <reference/Realms.Realm.html#Realms_Realm_WriteAsync_System_Action_System_Threading_CancellationToken_>`
   methods. Prefer ``WriteAsync()`` to avoid blocking the UI, unless blocking
   the UI is desired.

#. Instantiate an unmanaged object instance whose object model implements one
   of the SDK's object interfaces. For more information, refer to 
   :ref:`sdks-object-models`.

#. Pass the unmanaged object instance to the
   :dotnet-sdk:`Realm.Add() method <reference/Realms.Realm.html#Realms_Realm_Add__1___0_System_Boolean_>`
   to persist the object data to the database.

   Note that asymmetric objects are write-only. Once an asymmetric object is
   synced, it is deleted from the device database. You cannot read, update, or
   delete an asymmetric object from the device.
