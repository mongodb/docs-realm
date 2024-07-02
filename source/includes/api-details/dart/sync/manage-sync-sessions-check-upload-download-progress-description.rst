.. versionchanged:: 2.0.0
   ``transferredBytes`` and ``transferrableBytes`` deprecated in favor of ``progressEstimate``

To monitor Sync progress, call :flutter-sdk:`SyncSession.getProgressStream()
<realm/Session/getProgressStream.html>`. This method returns a Stream of
:flutter-sdk:`SyncProgress <realm/SyncProgress-class.html>` objects that provide
a ``progressEstimate`` for the current upload or download.

The provided ``progressEstimate`` is a double whose value
ranges from ``0.0`` to ``1.0``. At ``1.0``, the progress stream is complete.

``SyncSession.getProgressStream()`` takes two arguments:

- A :flutter-sdk:`ProgressDirection <realm/ProgressDirection.html>`
  enum that can be set to ``upload`` or ``download``. Specifies whether the
  progress stream monitors upload or download progress.

- A :flutter-sdk:`ProgressMode <realm/ProgressMode.html>` enum
  that can be set to one of the following:

  - ``reportIndefinitely``: Sets notifications to continue until the callback is
    unregistered.
  - ``forCurrentlyOutstandingWork``: Sets notifications to continue until the
    ``progressEstimate`` reaches ``1.0``.
