The following examples operate on a MongoDB collection that describes
inventory in a chain of plant stores. Consider the following collection
of documents describing various plants for sale in store:

.. code-block:: javascript

   [{"name": "venus flytrap", "sunlight": "full", "color": "white", "type": "perennial", "_partition": "Store 42"},
    {"name": "sweet basil", "sunlight": "partial", "color": "green", "type": "annual", "_partition": "Store 42"},
    {"name": "thai basil", "sunlight": "partial", "color": "green", "type": "perennial", "_partition": "Store 42"},
    {"name": "helianthus", "sunlight": "full", "color": "yellow", "type": "annual", "_partition": "Store 42"},
    {"name": "petunia", "sunlight": "full", "color": "purple", "type": "annual", "_partition": "Store 47"}]