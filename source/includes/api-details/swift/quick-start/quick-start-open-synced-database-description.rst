Once you have enabled Device Sync and authenticated a user, you can create
a :swift-sdk:`Configuration <Structs/Realm/Configuration.html>` object and 
open the database. You can then add a the Sync subscription that determines 
what data the database can read and write.

Once you have a database with a subscription, this example passes the database 
and the user to another function where you can use the database.
