.. code-block:: typescript

   // Find projects where the number of completed to-do items
   // is greater than or equal to the project's `quota` property.
   "SUBQUERY(items, $item, $item.isComplete == true).@count >= quota"
