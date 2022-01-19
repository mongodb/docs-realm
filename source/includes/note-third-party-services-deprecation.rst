.. important:: Third Party Services Deprecation

   Third party services in {+service+} have been deprecated in favor of using 
   :ref:`external dependencies <external-dependencies>` in functions.

   Webhooks have been renamed to :ref:`HTTPS Endpoints
   <https-endpoints>` with no change in behavior. You should
   :ref:`migrate <convert-webhooks-to-endpoints>` existing Webhooks.

   Existing services will continue to work until December 2022.

   Because third party services are now deprecated, they have been removed by 
   default from the {+ui+}. If you need to manage an existing third party 
   service, you can add third party services back to the UI by doing the following:

   - In the left navigation, under the :guilabel:`Manage` section, click 
     :guilabel:`App Settings`.

   - Enable the toggle switch next to 
     :guilabel:`Temporarily Re-Enable 3rd Party Services`, and then save your 
     changes.
