.. code-block:: typescript

     // Find all items assigned to Ali AND marked completed.
     "assignee == $0 AND isComplete == $1", "Ali", true

     // Find all items assigned to Alex OR to Ali.
     "assignee == $0 OR assignee == $1", "Alex", "Ali"
