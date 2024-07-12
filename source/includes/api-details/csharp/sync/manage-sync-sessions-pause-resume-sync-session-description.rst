To pause synchronization for a specific session, you can call the 
:dotnet-sdk:`Stop() <reference/Realms.Sync.Session.html#Realms_Sync_Session_Stop>` 
method on the session.

When you then call the 
:dotnet-sdk:`Start() <reference/Realms.Sync.Session.html#Realms_Sync_Session_Start>`  
method on the paused session, the Sync session resumes. 

The following code block demonstrates calling the ``Stop()`` and ``Start()`` 
methods: 
