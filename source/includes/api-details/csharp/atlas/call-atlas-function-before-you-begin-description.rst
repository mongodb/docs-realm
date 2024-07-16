These examples demonstrate calling an :ref:`Atlas Function <functions>` 
named ``sum`` that takes two arguments, adds them, and returns the result:

.. code-block:: javascript

   // sum: adds two numbers
   exports = function(a, b) {
     return a + b;
   };
