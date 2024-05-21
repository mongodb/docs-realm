.. code-block:: typescript

     // Find projects whose name starts with the letter 'e'
     // (case-insensitive).
     "name BEGINSWITH[c] $0", "e"

     // Find projects whose name contains the letters 'ie'
     // (case-sensitive).
     "name CONTAINS $0", "ie"
