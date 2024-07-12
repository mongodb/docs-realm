.. _sdks-YOUR_REF_NAME:

==========
Page Title
==========

.. meta::
   :description: Provide a short description of the consolidated page. This is critical for SEO.
   :keywords: Realm, C++ SDK, Flutter SDK, Kotlin SDK, Java SDK, .NET SDK, Node.js SDK, Swift SDK, code example

.. facet::
  :name: genre
  :values: reference

.. facet::
   :name: programming_language
   :values: cpp, csharp, dart, java, javascript/typescript, kotlin, objective-c, swift

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

.. tabs-selector:: drivers

Add your conceptual content to the page. Then, add the 
contents of the ``tabs-plus-code-example-include.rst`` and create SDK-specific
includes with SDK-specific API information.

If more than one SDK is lacking SDK-specific API information, create a generic
include with general information in the ``includes/api-details/generic``
directory, in a directory that is appropriately named for the docs ToC section.

To populate the code example box with switchable language selector, copy the
contents of ``code-example-include.rst`` and fill in the appropriate details
for all of the code examples. If a code example is missing or an API doesn't
exist in an SDK, use the appropriate placeholders for that language.

Example Page Content
--------------------

.. tabs-drivers::

   .. tab::
      :tabid: cpp-sdk

      .. include:: /includes/api-details/generic/crud/create-asymmetric-object-description.rst

   .. tab::
      :tabid: csharp

      .. include:: /includes/api-details/generic/crud/create-asymmetric-object-description.rst
      
   .. tab::
      :tabid: dart

      .. include:: /includes/api-details/dart/crud/create-asymmetric-object-description.rst

   .. tab::
      :tabid: java

      .. include:: /includes/api-details/java/crud/create-asymmetric-object-not-supported.rst

   .. tab::
      :tabid: java-kotlin

      .. include:: /includes/api-details/java/crud/create-asymmetric-object-not-supported.rst

   .. tab::
      :tabid: javascript

      .. include:: /includes/api-details/generic/crud/create-asymmetric-object-description.rst

   .. tab::
      :tabid: kotlin

      .. include:: /includes/api-details/kotlin/crud/create-asymmetric-object-description.rst

   .. tab::
      :tabid: objectivec

      .. include:: /includes/api-details/generic/crud/create-asymmetric-object-description.rst

   .. tab::
      :tabid: swift

      .. include:: /includes/api-details/generic/crud/create-asymmetric-object-description.rst

   .. tab::
      :tabid: typescript

      .. include:: /includes/api-details/generic/crud/create-asymmetric-object-description.rst

.. include:: /templates/code-example-include.rst

.. The above `.. include::` creates the code example box with language selector
.. Make sure to use the appropriate include in the `includes/` directory.
