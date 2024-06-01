Use the :cpp-sdk:`should_compact_on_launch() <structrealm_1_1internal_1_1bridge_1_1realm_1_1config.html>` 
method on the database configuration to attempt to compact the database. 
Specify conditions to execute this method, such as:

- The size of the file on disk
- How much free space the file contains

The following example shows setting the conditions to compact a realm if the 
file is above 100 MB and 50% or less of the space in the realm file is used.