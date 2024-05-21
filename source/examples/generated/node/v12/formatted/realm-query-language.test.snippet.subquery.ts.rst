.. code-block:: typescript

   // Find projects with incomplete to-do items assigned to Alex.
   "SUBQUERY(items, $item, $item.isComplete == false AND $item.assignee == 'Alex').@count > 0"
