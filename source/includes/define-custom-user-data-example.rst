.. example::
   
   You can access custom user data from a ``StitchUser`` object in
   :doc:`functions </functions>` and :doc:`rule expressions
   </services/json-expressions>`.

   .. tabs-stitch-sdks::
      
      .. tab::
         :tabid: json-expressions
         
         .. code-block:: json
          
            {
              "%%user.custom_data.favoriteColor": "blue"
            }
      
      .. tab::
         :tabid: functions
         
         .. code-block:: javascript
            
            const user = context.user;
            const likesBlue = user.custom_data.favoriteColor === "blue";
