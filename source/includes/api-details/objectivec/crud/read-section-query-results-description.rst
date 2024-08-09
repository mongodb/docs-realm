In Objective-C, you can create a :objc-sdk:`RLMSectionedResults
<Classes/RLMSectionedResults.html>` type-safe collection in two ways:

- Using a keyPath: :objc-sdk:`-sectionedResultsSortedUsingKeyPath:ascending:keyBlock:
  <Protocols/RLMCollection.html#/c:objc(pl)RLMCollection(im)sectionedResultsSortedUsingKeyPath:ascending:keyBlock:>`
- Using a sort descriptor: :objc-sdk:`-sectionedResultsUsingSortDescriptors:keyBlock:
  <Protocols/RLMCollection.html#/c:objc(pl)RLMCollection(im)sectionedResultsUsingSortDescriptors:keyBlock:>`

You can get a count of the sections, get a list of keys, or access an individual
:objc-sdk:`RLMSectionedResult segment <Protocols/RLMSectionedResult.html>` by
key or index.

You can :ref:`observe <sdks-react-to-changes>` ``RLMSectionedResults`` and
``RLMSectionedResult`` instances.
