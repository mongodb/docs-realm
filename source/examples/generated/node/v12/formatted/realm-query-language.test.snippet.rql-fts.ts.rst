.. code-block:: typescript

     // Find items with 'write' in the name.
     "name TEXT $0", "write"

     // Use '-' to exclude:
     // Find items with 'write' but not 'tests' in the name
     "name TEXT $0", "write -tests"

     // Use '*' to match any characters after a prefix:
     // Find items with a name that starts with 'wri'
     "name TEXT $0", "wri*"
