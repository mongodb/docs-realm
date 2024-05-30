.. code-block:: typescript

       // Evaluate against an item's `priority` property value:
       "2 * priority > 6" // resolves to `priority > 3`
       "priority >= 2 * (2 - 1) + 2" // resolves to `priority >= 4`

       // Evaluate against multiple object property values:
       "progressMinutes * priority == 90"
