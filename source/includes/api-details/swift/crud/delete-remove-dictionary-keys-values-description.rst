You can delete :swift-sdk:`map <Classes/Map.html>` entries in a few ways:

- Use ``removeObject(for:)`` to remove the key and the value
- If the dictionary's value is optional, you can set the value of the key to 
  ``nil`` to keep the key.
