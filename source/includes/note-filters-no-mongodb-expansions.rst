.. important::

   {+service+} evaluates and applies filters before it reads any
   documents, so you cannot use :ref:`MongoDB document expansions
   <mongodb-expansions>` in a filter's :guilabel:`Apply When`
   expression. However, you can use other :doc:`expression variables
   </services/expression-variables>`, such as :json-expansion:`%%user`,
   :json-expansion:`%%values`, and :json-operator:`%function`.
