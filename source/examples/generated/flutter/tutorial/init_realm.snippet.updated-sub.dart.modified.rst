.. code-block:: dart
   :caption: lib/realm/init_realm.dart
   :emphasize-lines: 2, 7-11

   final userTaskSub =
       realm.subscriptions.findByName('getUserItemsWithPriority'); 
   if (userTaskSub == null) {
     realm.subscriptions.update((mutableSubscriptions) {
       // server-side rules ensure user only downloads own tasks
       mutableSubscriptions.add(
           realm.query<Item>(
             'priority <= \$0',
             [PriorityLevel.high],
           ),
           name: 'getUserItemsWithPriority');
     });
   }
