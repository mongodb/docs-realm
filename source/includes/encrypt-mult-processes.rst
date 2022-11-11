You cannot open the same encrypted realm from multiple processes.
Attempting to do so will throw the following error:
``Encrypted interprocess sharing is currently unsupported.``

.. tip::

   If multiple processes need to access a realm simultaneously, use an unencrypted realm. 
   Encrypted realms *cannot* be accessed by multiple processes at the same time. 
