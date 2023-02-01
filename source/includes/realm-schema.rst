A **realm schema** is a list of valid object schemas that a realm 
may contain.
Every Realm object must conform to an object type that's included in 
its realm's schema. 

If a realm already contains data when you open it, Realm Database
validates each object to ensure that an object schema was provided 
for its type and that it meets all of the constraints specified in 
the schema.