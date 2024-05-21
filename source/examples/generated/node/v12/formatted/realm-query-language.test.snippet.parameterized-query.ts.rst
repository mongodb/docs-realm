.. code-block:: typescript

       // Include one parameter with `$0`.
       "progressMinutes > 1 AND assignee == $0", "Ali"

       // Include multiple parameters using ascending integers,
       // starting at`$0`.
       "progressMinutes > $0 AND assignee == $1", 1, "Alex"
