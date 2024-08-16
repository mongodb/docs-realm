To filter a query, run :js-sdk:`collection.filtered()
<classes/OrderedCollection.html#filtered>` to specify a subset of results
based on the value(s) of one or more object properties. You can specify
results based on the value of a dictionary's properties by using
:mdn:`bracket-notation <Web/JavaScript/Reference/Operators/Property_accessors>`.

You can also determine whether a results collection has a certain key or value
by using ``<dictionary>.@keys`` or ``<dictionary>.@values``. For instance, if
you had a ``Person`` collection with a nested ``home`` dictionary, you could
return all ``Person`` objects with a ``home`` with a ``"price"`` property by
running the query: ``home.@keys = "price"``.
