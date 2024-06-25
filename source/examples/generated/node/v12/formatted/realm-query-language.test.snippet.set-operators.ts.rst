.. code-block:: typescript

     // Find projects with no complete items.
     "NONE items.isComplete == $0", true

     // Find projects that contain any item with priority 10.
     "items.priority == $0", 10 // (ANY operator is implied.)

     // Find projects that only contain completed items.
     "ALL items.isComplete == $0", true

     // Find projects with at least one item assigned to either Alex or Ali.
     "ANY items.assignee IN { $0 , $1 }", "Alex", "Ali"

     // Find projects with no items assigned to either Alex or Ali.
     "NONE items.assignee IN { $0 , $1 }", "Alex", "Ali"
