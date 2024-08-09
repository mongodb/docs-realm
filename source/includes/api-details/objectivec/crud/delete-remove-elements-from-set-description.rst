You can remove one or more elements from a :objc-sdk:`RLMSet
<Classes/RLMSet.html>` in a write transaction.

- To remove one element from the
  set, call :objc-sdk:`removeObject 
  <Classes/RLMSet.html#/c:objc(cs)RLMSet(im)removeObject:>` with the element
  you want to delete.
- To remove from the receiving set elements that *aren't* a member of another
  set, call :objc-sdk:`intersectSet
  <Classes/RLMSet.html#/c:objc(cs)RLMSet(im)intersectSet:>` with the other set
  as an argument.
- To remove from the receiving set elements that *are* a member of another set,
  call :objc-sdk:`minusSet <Classes/RLMSet.html#/c:objc(cs)RLMSet(im)minusSet:>`
  with the other set as an argument.

You can remove *all* set elements at once by calling
:objc-sdk:`removeAllObjects
<Classes/RLMSet.html#/c:objc(cs)RLMSet(im)removeAllObjects>`.