Unlike using `std::sort <https://en.cppreference.com/w/cpp/algorithm/sort>`__, 
the SDK's sort implementation preserves the lazy loading of objects. It does
not pull the entire set of results or list objects into memory, but only
loads them into memory when you access them.

To sort, call the ``.sort()`` function on a list or results set with one or more 
:cpp-sdk:`sort_descriptors <structrealm_1_1internal_1_1bridge_1_1sort__descriptor.html>`.

A ``sort_descriptor`` includes:

- The desired key path to sort by, as a string.
- A bool to specify sort order, where``true`` is ascending and ``false`` 
  is descending.

In this example, we sort a results set on ``priority`` in descending order.

.. literalinclude:: /examples/generated/cpp/filter-data.snippet.sort-results-by-single-property.cpp
   :language: cpp

You can also sort a list or results set by multiple sort descriptors. In 
this example, we sort a list property on ``assignee`` in ascending order, 
and then on ``priority`` in descending order. 
