.. versionadded:: v11.6.0

You can observe a flow of authentication change events by calling
:dotnet-sdk:`User.Changed() <reference/Realms.Sync.User.html#Realms_Sync_User_Changed>`
on a valid user object.

Currently, ``User.Changed()`` triggers on all user events and you should add a
handler to ensure your responses to events are idempotent.
