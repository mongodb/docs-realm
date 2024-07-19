You can use the 
:cpp-sdk:`sync_session <structrealm_1_1internal_1_1bridge_1_1sync__session.html>`'s
``wait_for_upload_completion()`` and ``wait_for_download_completion()``
methods to wait for changes to upload to or download from Atlas. Both of these
methods can optionally take a callback to execute when upload or download
is complete.

To wait for all changes to upload to Atlas from your synced database,
use the member function ``wait_for_upload_completion()``. 

.. literalinclude:: /examples/generated/cpp/sync-session.snippet.wait-for-upload.cpp
   :language: cpp

To wait for all changes from Atlas
to download to your synced database, use the member function 
``wait_for_download_completion()``. Refresh the database after downloading 
any changes to be sure it reflects the most recent data.
