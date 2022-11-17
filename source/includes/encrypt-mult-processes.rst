You cannot open the same encrypted realm from multiple processes.
Attempting to do so will throw the following error:
``Encrypted interprocess sharing is currently unsupported.``

If multiple processes need to access a realm simultaneously, use an unencrypted realm. 

