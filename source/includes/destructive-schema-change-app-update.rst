.. note:: Destructive Schema Changes Require an App Schema Update

   After a destructive schema change, clients must update their local
   object models before they can resume syncing. Only clients that use
   models affected by that schema change need to update and perform
   a client reset.