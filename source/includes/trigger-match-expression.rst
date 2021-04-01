A :manual:`$match </reference/operator/aggregation/match>` expression document
that {+service-short+} uses to filter which change events cause the Trigger to
fire. The Trigger evaluates all change event objects that it receives against
this match expression and only executes if the expression evaluates to ``true``
for a given change event.

.. note:: Use Dot-Notation for Embedded Fields
   
   MongoDB performs a full equality match for embedded documents in a match
   expression. If you want to match a specific field in an embedded document,
   refer to the field directly using :manual:`dot-notation
   </core/document/#document-dot-notation>`. For more information, see
   :manual:`Query on Embedded Documents </tutorial/query-embedded-documents>` in
   the MongoDB server manual.

.. example::
   
   The following :guilabel:`Match Expression` configures a trigger to fire only
   if the change event object specifies that the ``status`` field in a document
   changed.
   
   .. code-block:: javascript
   
      {
        "updateDescription.updatedFields.status": {
          "$exists": true
        }
      }
