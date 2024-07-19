.. code-block:: typescript

     // Find incomplete items, sort by `priority` in descending order,
     // then sort equal `priority` values by `progressMinutes`
     // in ascending order
     "isComplete == false SORT(priority DESC, progressMinutes ASC)"

     // Find high priority items, then remove from the results any items
     // with duplicate values for both `name` AND `assignee` properties
     "priority >= 5 DISTINCT(name, assignee)"

     // Find in-progress items, then return the first 10 results
     "progressMinutes > 0 && isComplete != true LIMIT(10)"
