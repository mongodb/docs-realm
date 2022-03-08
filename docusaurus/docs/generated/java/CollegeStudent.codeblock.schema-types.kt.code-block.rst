.. code-block:: kotlin

   open class CollegeStudent : RealmObject() {
       @Required
       var notes = RealmList<String>()
       var nullableNotes = RealmList<String>()
   }
