You can query a :objc-sdk:`RLMDictionary
<Classes/RLMDictionary.html>` with the same predicates as :objc-sdk:`RLMObject
<Classes/RLMObject.html>` and :objc-sdk:`RLMResults <Classes/RLMResults.html>`.

- Access :objc-sdk:`allKeys
  <Classes/RLMDictionary.html#/c:objc(cs)RLMDictionary(py)allKeys>` or
  :objc-sdk:`allValues
  <Classes/RLMDictionary.html#/c:objc(cs)RLMDictionary(py)allValues>`.
- Get the :objc-sdk:`-objectForKey:
  <Classes/RLMDictionary.html#/c:objc(cs)RLMDictionary(im)objectForKey:>` or
  :objc-sdk:`-valueForKey:
  <Classes/RLMDictionary.html#/c:objc(cs)RLMDictionary(im)valueForKey:>`.
- Work with keys and objects using :objc-sdk:`-enumerateKeysAndObjectsUsingBlock:
  <Classes/RLMDictionary.html#/c:objc(cs)RLMDictionary(im)enumerateKeysAndObjectsUsingBlock:>`.

.. tip:: RLMDictionary may contain keys whose values are nil

   An SDK map may contain keys with ``nil`` values. If you delete an object
   that is used as a map value, the value is set to ``nil`` but the key
   remains unless you explicitly delete it. If your app deletes map values
   without also explicitly cleaning up the keys, you may need to perform
   optional unwrapping when you read map values.
