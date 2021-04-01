A :manual:`$project </reference/operator/aggregation/project>` expression
document that {+service-short+} uses to filter the fields that appear in change
event objects.

.. example::
   
   A trigger is configured with the following :guilabel:`Project Expression`:
   
   .. code-block:: json
   
      {
        "_id": 0,
        "operationType": 1,
        "updateDescription.updatedFields.status": 1
      }
   
   The change event object that {+service-short+} passes to the trigger function
   only includes the fields specifed in the projection, as in the following
   example:
   
   .. code-block:: json
      
      {
        "operationType": "update",
        "updateDescription": {
          "updatedFields": {
            "status": "InProgress"
          }
        }
      }
