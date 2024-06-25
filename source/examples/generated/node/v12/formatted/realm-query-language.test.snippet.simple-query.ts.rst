.. code-block:: typescript

   const items = realm.objects(Item);
   // Get all items where 'priority' property is 7 or more.
   const importantItems = items.filtered("priority >= $0", 7);
