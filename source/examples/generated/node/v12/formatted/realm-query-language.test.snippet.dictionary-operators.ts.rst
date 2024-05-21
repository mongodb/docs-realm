.. code-block:: typescript

     // Find `comments` dictionary properties with key 'status'.
     "comments.@keys == $0", "status"

     // Find `comments` dictionary properties with key 'status'
     // and value 'On track'.
     "comments['status'] == $0", "On track"
     // Find `comments` dictionary properties with
     // more than one key-value pair.
     "comments.@count > $0", 1

     // Find `comments` dictionary properties where ANY
     // values are of type 'string`.
     "ANY comments.@type == 'string'"
     "comments.@type == 'string'" // (Equivalent - ANY is implied.)

     // Find `comments` dictionary properties where ALL
     // values are of type 'int'.
     "ALL comments.@type == 'int'"

     // Find `comments` dictionary properties where NO
     // values are of type 'int'.
     "NONE comments.@type == 'int'"

