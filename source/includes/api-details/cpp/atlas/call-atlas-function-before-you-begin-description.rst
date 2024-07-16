The example on this page demonstrates calling an :ref:`Atlas Function <functions>` 
named ``concatenate`` that takes two arguments, concatenates them, and 
returns the result:

.. code-block:: javascript

   // concatenate: concatenate two strings
   exports = function(a, b) {
     return a + b;
   };
