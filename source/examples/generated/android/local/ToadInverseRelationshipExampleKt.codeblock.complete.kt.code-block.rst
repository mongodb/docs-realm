.. code-block:: kotlin
   :emphasize-lines: 8

   import io.realm.RealmList
   import io.realm.RealmObject




   class Toad : RealmObject {
       var frogFriends: RealmList<Frog>? = null 

       constructor(frogFriends: RealmList<Frog>?) {
           this.frogFriends = frogFriends
       }

       constructor() {}
   }
