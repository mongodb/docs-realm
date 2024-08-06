In the following example, we call :dotnet-sdk:`Realm.RemoveRange\<T\> 
<reference/Realms.Realm.html#Realms_Realm_RemoveRange__1_System_Linq_IQueryable___0__>`
to remove Ali's ``dogs`` collection, which is a to-many list property 
containing one or more ``Dog`` objects. Then, we call :dotnet-sdk:`Realm.Remove()
<reference/Realms.Realm.html#Realms_Realm_Remove_Realms_IRealmObjectBase_>` to
delete Ali's ``Person`` object itself.
