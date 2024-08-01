You can access the subscription set through the ``subscriptions()`` public
member function of a :cpp-sdk:`realm <structrealm_1_1db.html>`. This 
provides the :cpp-sdk:`sync_subscription_set 
<structrealm_1_1sync__subscription__set.html>` where you can use the 
``size()``, ``find()``, or ``update()`` member functions. You perform all
operations to add, find, update, remove, or watch subscriptions through this
property.
