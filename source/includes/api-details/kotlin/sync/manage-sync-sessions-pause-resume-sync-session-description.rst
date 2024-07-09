To pause syncing for a session, call :kotlin-sync-sdk:`syncSession.pause()
<io.realm.kotlin.mongodb.sync/-sync-session/pause.html>`.
The database does not sync changes with Atlas while the session is paused.

To resume syncing changes, call :kotlin-sync-sdk:`syncSession.resume()
<io.realm.kotlin.mongodb.sync/-sync-session/resume.html>`.
