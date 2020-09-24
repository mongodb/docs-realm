.. admonition:: Custom Data May Be Stale
   :class: warning
   
   {+backend+} does not dynamically update a user's custom data if the
   underlying document changes. Instead, {+backend+} fetches a new copy
   of the data whenever a user refreshes their access token, such as
   when they log in. This may mean that the custom data won't
   immediately reflect changes, e.g. updates from an authentication
   Trigger. The client SDKs automatically refresh a logged-in
   user's access token periodically, so the user's custom data should
   never remain stale for more than 30 minutes.