.. code-block:: text
   :emphasize-lines: 2-3, 5, 7-9, 12-16

   final userItemSub = realm.subscriptions.findByName('getUserItems');
   final userItemSubWithPriority =
       realm.subscriptions.findByName('getUserItemsWithPriority');

   if (userItemSubWithPriority == null) {
     realm.subscriptions.update((mutableSubscriptions) {
       if (userItemSub != null) {
         mutableSubscriptions.remove(userItemSub);
       }
       // server-side rules ensure user only downloads own items
       mutableSubscriptions.add(
           realm.query<Item>(
             'priority <= \$0',
             [PriorityLevel.high],
           ),
           name: 'getUserItemsWithPriority');
     });
   }
