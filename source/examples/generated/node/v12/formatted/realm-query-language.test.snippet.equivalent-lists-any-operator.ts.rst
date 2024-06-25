.. code-block:: typescript

     "assignee == ANY { $0, $1 }", "Alex", "Ali"

     "assignee == { $0, $1 }", "Alex", "Ali" // Equivalent (ANY is implied.)
