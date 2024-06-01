Use :objc-sdk:`shouldCompactOnLaunch <Classes/RLMRealmConfiguration.html>` 
on a realm's configuration object to compact a realm. 
Specify conditions to execute this method, such as:

- The size of the file on disk
- How much free space the file contains

For more information about the conditions to execute in the method, see:
:ref:`ios-when-to-compact-a-realm`.

.. important:: Compacting may not occur

    Compacting cannot occur while a realm is being accessed, 
    regardless of any configuration settings.