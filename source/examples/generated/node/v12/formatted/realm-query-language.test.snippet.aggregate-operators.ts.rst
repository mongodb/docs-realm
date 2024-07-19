.. code-block:: typescript

   var priorityNum = 5;

     // Find projects with average item `priority` above 5
     "items.@avg.priority > $0", priorityNum

     // Find projects where every item has a `priority` less than 5
     "items.@max.priority < $0", priorityNum

     // Find projects where every item has `priority` greater than 5
     "items.@min.priority > $0", priorityNum

     // Find projects with more than 5 items
     "items.@count > $0", 5

     // Find projects where the sum total value of `progressMinutes`
     // across all items is greater than 100
     "items.@sum.progressMinutes > $0",
     100
