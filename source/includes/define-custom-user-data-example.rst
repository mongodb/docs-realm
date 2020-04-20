.. example::
   
   You can access custom user data in the client SDKs as well as
   :doc:`functions </functions>` and :doc:`rule expressions
   </services/json-expressions>`.

   .. tabs-realm-sdks::
      
      .. tab::
         :tabid: javascript
         
         .. code-block:: javascript
            :emphasize-lines: 3
          
            const app = Realm.defaultAppClient;
            const user = app.auth.user;
            const speaksEnglish = user.customData.primaryLanguage === "English";
      
      .. tab::
         :tabid: android
         
         .. code-block:: java
            :emphasize-lines: 3
          
            RealmAppClient app = Realm.getDefaultAppClient();
            RealmUser user = client.getAuth().getUser();
            Boolean speaksEnglish = user.getCustomData().primaryLanguage == "English";
      
      .. tab::
         :tabid: ios
         
         .. code-block:: swift
            :emphasize-lines: 3
          
            let app: RealmAppClient = Realm.defaultAppClient
            let user: RealmUser = app.auth.currentUser
            let speaksEnglish: Bool = user.customData.primaryLanguage == "English"
      
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
