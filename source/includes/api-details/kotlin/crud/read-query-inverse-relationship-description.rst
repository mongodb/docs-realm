In the following example, a parent object of type ``User`` has an inverse 
relationship to a child object of type ``Post``. We can query the parent 
object's ``User.posts`` relationship ("User has many Posts") as well 
as the inverse ``Post.user`` relationship ("Post belongs to User"):

.. literalinclude:: /examples/generated/kotlin/ReadTest.snippet.query-inverse-relationship.kt
   :language: kotlin

.. important:: Querying Inverse Relationship by Remapped Class Names
   
   If the inverse relationship property is an object type with a 
   remapped (persisted) class name, you *must* use the remapped class 
   name in the raw RQL query.
