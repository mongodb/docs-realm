.. important::

   {+service+} evaluates and applies filters before it reads any documents, so
   you cannot use :ref:`MongoDB document expansions <mongodb-expansions>` in a
   filter's Apply When expression. However, you can use other
   :ref:`expression variables <expressions>`, such as :json-expansion:`%%user`,
   :json-expansion:`%%values`, and :json-operator:`%function`.
