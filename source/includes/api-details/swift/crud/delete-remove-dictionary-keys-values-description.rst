You can delete :swift-sdk:`map <Classes/Map.html>` entries in a few ways:

- Use ``removeObject(for:)`` to remove the key and the value
- If the dictionary's value is optional, you can set the value of the key to 
  ``.none`` to keep the key. This sets the key's value to ``nil`` but does
  not delete the key.
- Like a Swift dictionary, if you set the key value to ``nil``, this deletes
  both the key and the value.
- If the value of a dictionary key is another object, and you delete the
  object, the key remains and its value is set to ``nil``.
