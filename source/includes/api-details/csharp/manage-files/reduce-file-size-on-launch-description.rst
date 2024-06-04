You can use the .NET SDK to check the realm file size each time 
it is opened by specifying a 
:dotnet-sdk:`ShouldCompactDelegate <reference/Realms.RealmConfiguration.ShouldCompactDelegate.html>` 
in the configuration. 

If the delegate returns ``true`` -- and the file is not in use -- the realm file 
is compacted prior to making the instance available.
