.. code-block:: javascript

   {
     "name": "<Filter Name>",
     "apply_when": <JSON Expression>,
     "query": <Query Document>,
     "projection": <Projection Document>
   }

.. list-table::
   :header-rows: 1
   :widths: 15 40

   * - Field
     - Description

   * - | ``name``
       | String
     - Required. The name of the filter. Filter names are
       useful for identifying and distinguishing between filters.
       Limited to 100 characters or fewer.

   * - ``apply_when``
     - Required. A :doc:`JSON expression </services/json-expressions>`
       that determines when this filter applies to a given query.

       .. include:: /includes/note-filters-no-mongodb-expansions.rst

   * - | ``query``
       | Document
     - Required. A :manual:`MongoDB query filter
       </tutorial/query-documents/>` that contains additional
       query predicates to merge into incoming queries that the
       filter applies to.

       .. example::

          A filter that withholds documents that have a ``score``
          below ``20`` could use the following filter query:

          .. code-block:: json

             { "score": { "$gt": 20 } }

   * - | ``projection``
       | Document
     - Required. A :manual:`MongoDB projection document
       </tutorial/project-fields-from-query-results/>` that specifies
       additional field projections to merge into incoming queries that
       the filter applies to.

       .. admonition:: Projection Conflicts
          :class: important
          
          MongoDB projections can be either inclusive or exclusive, i.e.,
          they can either return only specified fields or withhold
          fields that are not specified. If multiple filters apply to a
          query, the filters must all specify the same type of
          projection, or the query will fail.

       .. example::

          A filter that withholds the ``_internal`` field from all
          documents could use the following filter projection:

          .. code-block:: json

             { "_internal": 0 }
