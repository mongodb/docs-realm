After you update subscriptions, call ``refresh()`` on the :cpp-sdk:`realm 
<structrealm_1_1db.html>`. This updates the database and outstanding objects 
managed by the database to point to the most recent data.

.. literalinclude:: /examples/generated/cpp/flexible-sync.snippet.refresh-the-realm.cpp
   :language: cpp
