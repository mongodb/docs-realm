You can use the .NET SDK to check the file size each time 
it is opened by specifying a 
:dotnet-sdk:`ShouldCompactDelegate <reference/Realms.RealmConfiguration.ShouldCompactDelegate.html>` 
in the configuration. 

If the delegate returns ``true`` -- and the file is not in use -- the file 
is compacted prior to making the instance available.
