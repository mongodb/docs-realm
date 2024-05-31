.. code-block:: typescript

     // Find projects with incomplete items with 'Demo' in the name.
     "SUBQUERY(items, $item, $item.isComplete == false AND $item.name CONTAINS[c] 'Demo').@count > 0"

     // Find projects where the number of completed items is greater than or equal to the project's `quota` property.
     "SUBQUERY(items, $item, $item.isComplete == true).@count >= quota"
