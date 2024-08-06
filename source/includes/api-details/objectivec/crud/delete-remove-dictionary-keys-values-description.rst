You can remove :objc-sdk:`RLMDictionary <Classes/RLMDictionary.html>`
entries in a few ways:

- To remove the value but keep the key, set the key to ``null`` (the 
  dictionary's value must be nullable)
- To remove the key and the value, pass the key to 
  :objc-sdk:`removeObjectForKey <Classes/RLMDictionary.html#/c:objc(cs)RLMDictionary(im)removeObjectForKey:>`
- To remove keys specified by elements in a given array, pass the array to
  :objc-sdk:`removeObjectsForKeys <Classes/RLMDictionary.html#/c:objc(cs)RLMDictionary(im)removeObjectsForKeys:>`

You can also remove *all* keys and values by calling 
:objc-sdk:`removeAllObjects <Classes/RLMDictionary.html#/c:objc(cs)RLMDictionary(im)removeAllObjects>`.
