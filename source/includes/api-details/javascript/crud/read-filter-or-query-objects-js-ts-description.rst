To filter a query, call :js-sdk:`filtered()
<classes/Results.html#filtered>` on a collection. Pass a Realm Query Language
query as argument to ``filtered()``.

In the following example, we use RQL comparison operators to:

- Find high priority tasks by comparing the value of the ``priority`` property
  value with a threshold number, above which priority can be considered high.
- Find just-started or short-running tasks by seeing if the ``progressMinutes``
  property falls within a certain range.
