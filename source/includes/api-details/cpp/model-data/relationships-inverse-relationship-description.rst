To define an inverse relationship, use ``linking_objects`` in your object 
model. The ``linking_objects`` definition specifies the object type and 
property name of the relationship that it inverts.

In this example, we define a ``Person`` having a to-one relationship with
a ``Dog``. The ``Dog`` has an inverse relationship to any ``Person`` 
objects through its ``owners`` property.
