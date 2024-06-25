.. code-block:: typescript

   var priorityNum = 5;

     // Find projects with average item `priority` above 5.
     "items.@avg.priority > $0", priorityNum

     // Find projects where maximum `priority` of all items is 5.
     "items.@max.priority < $0", priorityNum

     // Find projects where minimum `priority` of all items is 5.
     "items.@min.priority > $0", priorityNum


     // Find projects with more than 5 items.
     "items.@count > $0", 5

     // Find projects with item `progressMinutes` greater than 100.
     "items.@sum.progressMinutes > $0", 100
