.. code-block:: typescript

     // Find items with 'write' in the name.
     "name TEXT $0", "write"

     // Use '-' to exclude:
     // Find items with 'write' but not 'tests' in the name.
     "name TEXT $0", "write -tests"

     // Use '*' to match any suffix characters:
     // Find items starting with 'wri-'.
     "name TEXT $0", "wri*"
