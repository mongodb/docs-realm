.. code-block:: typescript

     // Compare `priority` values against a threshold value
     "priority > $0", 5

     // Compare `assignee` values to `null` value.
     "assignee == $0", null

     // Compare `priority` values against an inclusive range of values
     "priority BETWEEN { $0 , $1 }", 1, 5

     // Compare `progressMinutes` values against any of the listed values
     "progressMinutes IN { $0, $1, $2 }", 10, 30, 60
