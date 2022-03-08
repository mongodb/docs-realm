.. example::
   
   You can access custom user data in the client SDKs as well as :doc:`functions
   </functions>` and :ref:`rule expressions <expressions>`.

   .. tabs-realm-sdks::

      .. tab::
         :tabid: json-expressions
         
         .. code-block:: json
          
            {
              "%%user.custom_data.primaryLanguage": "English"
            }
      
      .. tab::
         :tabid: functions
         
         .. code-block:: javascript
            
            const user = context.user;
            const speaksEnglish = user.custom_data.primaryLanguage === "English";
