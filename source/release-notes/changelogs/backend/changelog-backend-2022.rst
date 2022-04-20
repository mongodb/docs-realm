.. _backend_20220317:

20 April 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Introduced ability to accept null values as optional types in Realm Schema.
- Added ability to download logs from the UI.
- Added Flexible Sync support for queries using ``BETWEEN`` and the string operators ``BEGINSWITH``, ``ENDSWITH``, ``CONTAINS``.

25 March 2022 Release
~~~~~~~~~~~~~~~~~~~~~
- Performance improvements for Functions, particularly aimed at decreasing the 
  runtime for those dependencies that make external requests. 

- MongoDB Atlas moved to Let's Encrypt as the new Certificate 
  Authority for TLS certificates for all Realm services.

.. _backend_20220126:

26 January 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Visually refreshed the :ref:`Schema UI <enforce-a-schema>`.
- Introduced :ref:`Log Forwarding <forward-logs>`, which automatically stores your
  application's server-side logs in a MongoDB collection or sends them to
  an external service.

.. _backend_20220119:

19 January 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Introduced :ref:`Flexible Sync (preview) <flexible-sync>`, which allows clients to sync data without the need for partition keys.
