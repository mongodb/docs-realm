For example, you might add a computed variable to your object to get the 
first letter of the ``name`` property:

.. literalinclude:: /examples/generated/code/start/ReadRealmObjects.snippet.sectioned-result-variable.swift
   :language: swift

Then, you can create a :swift-sdk:`SectionedResults <Structs/SectionedResults.html>`
type-safe collection for that object, and use it to retrieve objects sectioned
by that computed variable: 

.. literalinclude:: /examples/generated/code/start/ReadRealmObjects.snippet.get-sectioned-results.swift
   :language: swift

You can get a count of the sections, get a list of keys, or access an individual
:swift-sdk:`ResultSection <Structs/ResultsSection.html>` by index:

.. literalinclude:: /examples/generated/code/start/ReadRealmObjects.snippet.section-query-results.swift
   :language: swift

You can also section using a callback. This enables you to section a 
collection of primitives, or have more control over how the section key is 
generated.

.. literalinclude:: /examples/generated/code/start/ReadRealmObjects.snippet.section-query-results-callback.swift
   :language: swift

You can :ref:`observe <sdks-react-to-changes>` ``SectionedResults`` and
``ResultsSection`` instances, and both conform to 
:swift-sdk:`ThreadConfined <Protocols/ThreadConfined.html>`.
