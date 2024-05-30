.. code-block:: typescript

     // 1. Sorts by highest priority.
     // 2. Returns the first item.
     // 3. Remove duplicate names (N/A because a single
     //    item is always considered distinct).
     "assignee == null SORT(priority ASC) LIMIT(1) DISTINCT(name)"

     // 1. Removes any duplicates by name.
     // 2. Sorts by highest priority.
     // 3. Returns the first item.
     "assignee == null DISTINCT(name) SORT(priority ASC) LIMIT(1)"
