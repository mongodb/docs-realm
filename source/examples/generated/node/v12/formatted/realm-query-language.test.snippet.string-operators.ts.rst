.. code-block:: typescript

       // Find projects whose name starts with 'E' or 'e'
       // (case-insensitive).
       "name BEGINSWITH[c] $0", "E"

       // Find projects whose name contains 'ie'
       // (case-sensitive).
       "name CONTAINS $0", "ie"

       // Find items where the assignee name is lexicographically
       // between 'Ali' and 'Chris' (case-sensitive).
       "assignee BETWEEN { $0 , $1 }", "Ali", "Chris"
       
       // Find projects where the street address is lexicographically
       // greater than '123 Main St' (case-sensitive).
       "projectLocation.address.street > $0", "123 Main St"
