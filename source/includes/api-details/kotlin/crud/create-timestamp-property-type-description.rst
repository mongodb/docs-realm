To create a new object instance with a 
:kotlin-sdk:`RealmInstant 
<io.realm.kotlin.types/-realm-instant/index.html>`
property, instantiate an object and pass an initial value to the 
``RealmInstant`` property using either: 

- :kotlin-sdk:`RealmInstant.from() <io.realm.kotlin.types/-realm-instant/-companion/from.html>`: 
  the epochSeconds and nanoseconds since the Unix epoch
- :kotlin-sdk:`RealmInstant.now() <io.realm.kotlin.types/-realm-instant/-companion/now.html>`: 
  the epochSeconds and nanoseconds since the Unix epoch until now

For more information about the ``RealmInstant`` type, refer to 
:ref:`<sdks-timestamp-data-type>`.

In the following example, we instantiate a new ``Frog`` object with a 
``birthdate`` property and pass an initial value to ``RealmInstant.from()``:
