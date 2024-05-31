.. code-block:: typescript

     // Find projects whose `comments` dictionary property have a key of 'status'.
     "comments.@keys == $0", "status"

     // Find projects whose `comments` dictionary property have a 'status' key with a value that ends in 'track'.
     "comments['status'] LIKE $0", "*track"

     // Find projects whose `comments` dictionary property have more than one key-value pair.
     "comments.@count > $0", 1

     // Find projects whose `comments` dictionary property contains only values of type 'string'.
     "ALL comments.@type == 'string'"

     // Find projects whose `comments` dictionary property contains no values of type 'int'.
     "NONE comments.@type == 'int'"
