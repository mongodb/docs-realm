To define an inverse relationship between objects, first define a 
collection property in the parent object whose type is a 
``RealmList<E>``, ``RealmSet<E>``, or ``RealmDictionary<E>``, where 
``<E>`` is a ``RealmObject`` object type defined in your data model. 
This can be a different Realm object type or the same Realm object 
type:

.. literalinclude:: /examples/generated/kotlin/Schema.snippet.define-inverse-property-parent.kt
  :language: kotlin

Then, define an immutable :kotlin-sdk:`backlinks 
<io.realm.kotlin.ext/backlinks.html>` property in the child object of
``RealmResults<E>``, where ``<E>`` is the parent object type:
