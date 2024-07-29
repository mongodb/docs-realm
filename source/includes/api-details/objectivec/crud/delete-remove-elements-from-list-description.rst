You can remove one or more elements from a :objc-sdk:`RLMArray <Classes/RLMArray.html>`
within a write transaction:

- To remove one element at a specified index in the list, pass the index to 
  :objc-sdk:`removeObjectAtIndex <Classes/RLMArray.html#/c:objc(cs)RLMArray(im)removeObjectAtIndex:>`.
- To remove the last element from the list, call
  :objc-sdk:`removeLastObject <Classes/RLMArray.html#/c:objc(cs)RLMArray(im)removeLastObject>`.

You can also remove *all* list elements at once by calling
:objc-sdk:`removeAllObjects <Classes/RLMArray.html#/c:objc(cs)RLMArray(im)removeAllObjects>`.
