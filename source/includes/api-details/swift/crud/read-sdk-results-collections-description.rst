The SDK's :swift-sdk:`Results <Structs/Results.html>` collection is
a class representing objects retrieved from queries. A ``Results`` collection
represents the lazily-evaluated results of a query operation, and has these
characteristics:

- Results are immutable: you cannot manually add or remove elements to or from
  the results collection.
- Results have an associated query that determines their contents.
- Results are **live** or **frozen** based on the query source. If they derive
  from live objects, the results automatically update when the database
  contents on the thread change. If they derive from frozen objects, they
  represent only a snapshot and do not automatically update.
- You cannot manually initialize an empty ``Results`` set. Results can only
  be initialized as the result of a query.

In Swift, the SDK also provides :swift-sdk:`SectionedResults
<Structs/SectionedResults.html>`, a type-safe collection which holds
``ResultsSection`` as its elements. Each :swift-sdk:`ResultSection
<Structs/ResultsSection.html>` is a collection that contains only
objects that belong to a given section key.

For example, an app that includes a contact list might use SectionedResults
to display a list of contacts divided into sections, where each section
contains all the contacts whose first name starts with the given letter.
The ``ResultsSection`` whose key is "L" would contain "Larry", "Liam",
and "Lisa".
