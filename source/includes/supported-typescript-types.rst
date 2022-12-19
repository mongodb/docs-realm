.. list-table::

   * - Realm.Types Type
     - Realm Schema Type
     - TypeScript Type	
     - Realm Type
     - Notes

   * - Types.String
     - string
     - string
     -  
     -  

   * - Types.Int
     - int
     - 
     - 
     - 

   * - Types.Float
     - float
     - 
     - 
     - 

   * - Types.Double
     - double
     - number
     - 
     - Double is the default number type

   * - Types.Decimal128
     - decimal128	
     - 
     - Realm.BSON.Decimal128
     - 

   * - Types.ObjectId
     - objectId
     - 
     - Realm.BSON.ObjectId
     - 

   * - Types.UUID
     - uuid
     - 
     - Realm.BSON.UUID
     - 

   * - Types.Date
     - date
     - Date	
     - 
     - 

   * - Types.Data
     - data
     - ArrayBuffer
     - 
     - 

   * - Types.List<T>
     - type[]
     - 
     - Realm.List<T>
     - T is the type of objects in the list

   * - Types.Set<T>
     - type<>	
     - 
     - Realm.Set<T>	
     - T is the type of objects in the set

   * - Types.Dictionary<T>
     - type{}
     - 
     - Realm.Dictionary<T>	
     - T is the type of objects in the set

   * - Types.Mixed
     - mixed
     - 
     - Realm.Mixed	
     - 

   * - Types.LinkingObjects<T, N>
     - linkingObjects
     - 	
     - 
     - T is the type of objects, N is the property name of the relationship (as a string)