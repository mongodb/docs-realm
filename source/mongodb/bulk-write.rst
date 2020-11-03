==========
Bulk Write
==========

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

Overview
--------

The code snippets on this page demonstrate how to perform a bulkWrite 
operation with the :method:`bulkWrite()` 
method.

.. include:: /includes/data-lake-no-writes-note.rst

.. include:: /mongodb/crud-snippets/data-model.rst

.. include:: /mongodb/crud-snippets/setup.rst

Methods
-------

Insert a Single Document
~~~~~~~~~~~~~~~~~~~~~~~~

You can insert a single document using the
:method:`collection.insertOne()` action.

The following :ref:`function <functions>` snippet inserts a single item
document into the ``items`` collection:

.. include:: /mongodb/crud-snippets/insertOne/functions.rst

Insert One or More Documents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can insert multiple documents at the same time using the
:method:`collection.insertMany()` action.

The following :ref:`function <functions>` snippet inserts multiple item
documents into the ``items`` collection:

.. include:: /mongodb/crud-snippets/insertMany/functions.rst
