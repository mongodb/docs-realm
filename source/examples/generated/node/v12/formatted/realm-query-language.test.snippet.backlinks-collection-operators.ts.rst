.. code-block:: typescript

     // Find items where ANY project that references the item
     // has a quota greater than 10.
     "ANY @links.Project.items.quota > 10"
     // Find items where ALL projects that reference the item
     // have a quota less than 5.
     "ALL @links.Project.items.quota < 5"
