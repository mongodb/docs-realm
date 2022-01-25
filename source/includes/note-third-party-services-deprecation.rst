.. important:: Third Party Services & Push Notifications Deprecation

   Third party services and push notifications in {+service+} have been deprecated
   in favor of creating HTTP endpoints that use :ref:`external dependencies
   <external-dependencies>`.
   
   You can no longer create new third-party services or push notifications, but
   existing services and push notifications will continue to work until December 2022.
   
   Because third party services and push notifications are now deprecated, they have
   been removed by default from the {+ui+}. If you need to manage an existing third party
   service or push notification, you can add the configurations back to the UI by doing
   the following:

   - In the left navigation, under the :guilabel:`Manage` section, click 
     :guilabel:`App Settings`.

   - Enable the toggle switch next to 
     :guilabel:`Temporarily Re-Enable 3rd Party Services`, and then save your 
     changes.
