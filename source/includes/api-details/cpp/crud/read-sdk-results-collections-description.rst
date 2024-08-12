The SDK's :cpp-sdk:`realm::results\<T\> <structrealm_1_1results.html>`
collection is a struct representing objects retrieved from queries. A results
collection represents the lazily-evaluated results of a query operation, and
has these characteristics:

- Results are immutable: you cannot manually add or remove elements to or from
  the results collection.
- Results have an associated query that determines their contents.
- Results are **live** or **frozen** based on the query source. If they derive
  from live objects, the results automatically update when the database
  contents change. If they derive from frozen objects, they represent only a
  snapshot and do not automatically update.
- You cannot manually initialize an empty results set. Results can only
  be initialized:

  - As the result of a query.
  - From a managed :ref:`list <sdks-read-list>`, using the
    :cpp-sdk:`as_results()
    <structrealm_1_1managed_3_01std_1_1vector_3_01T_01_5_01_4_01_4.html>`
    member funcion.
