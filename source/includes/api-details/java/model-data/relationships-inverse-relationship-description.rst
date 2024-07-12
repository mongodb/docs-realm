To define an inverse relationship, define a ``LinkingObjects`` property in your
object model. The ``LinkingObjects`` definition specifies the object type and
property name of the relationship that it inverts.

Fields annotated with ``@LinkingObjects`` must be:

- marked ``final``
- of type ``RealmResults<T>`` where ``T`` is the type at the opposite
  end of the relationship
