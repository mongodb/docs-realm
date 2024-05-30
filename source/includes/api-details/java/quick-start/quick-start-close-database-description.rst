It is important to remember to call the :java-sdk:`close()
<io/realm/Realm.html#close-->` method when done with a 
database instance to free resources. Neglecting to close realms can lead to an
``OutOfMemoryError``.
