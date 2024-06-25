.. tabs-drivers::

   tabs:
     - id: cpp-sdk
       content: |

         .. io-code-block::

            .. input:: /examples/generated/cpp/sync-errors.snippet.compensating-write-example.cpp
               :language: cpp

            .. output:: 
               :language: console

               Connection[2]: Session[10]: Received: ERROR "Client attempted a
               write that is not allowed; it has been reverted" (error_code=231,
               is_fatal=false, error_action=Warning)

     - id: csharp
       content: |

         .. literalinclude:: /examples/MissingPlaceholders/example.cs
            :language: csharp

     - id: dart
       content: |

         .. io-code-block::

            .. input:: /examples/generated/flutter/write_to_synced_realm_test.snippet.not-match-query-subscription.dart
               :language: dart

            .. output::
               :language: console

               [INFO] Realm: Connection[1]: Session[1]: Received: ERROR "Client attempted
               a write that is outside of permissions or query filters; it has been reverted"
               (error_code=231, try_again=true, error_action=Warning)
               [INFO] Realm: Connection[1]: Session[1]: Reporting compensating write
               for client version 21 in server version 2877: Client attempted a write that
               is outside of permissions or query filters; it has been reverted
               [ERROR] Realm: SyncSessionError message: Client attempted a write that
               is outside of permissions or query filters; it has been reverted
               Logs: https://services.cloud.mongodb.com/groups/5f60207f14dfb25d23101102/apps/639340a757271cb5e3a0f0cf/logs?co_id=6424433efb0c6bbcc330347c
               category: SyncErrorCategory.session code: SyncSessionErrorCode.compensatingWrite isFatal: false

     - id: javascript
       content: |

         .. literalinclude:: /examples/MissingPlaceholders/example.js
            :language: javascript

     - id: kotlin
       content: |

         .. io-code-block::

            .. input:: /examples/generated/kotlin/SyncedRealmCRUD.snippet.write-outside-flexible-sync-query.kt
               :language: kotlin

            .. output:: 
               :language: console

               [Session][CompensatingWrite(231)] Client attempted a write that
               is disallowed by permissions, or modifies an object outside the
               current query, and the server undid the change.

     - id: swift
       content: |

         .. io-code-block::

            .. input:: /examples/generated/code/start/SyncedRealmCRUD.snippet.write-outside-flexible-sync-query.swift
               :language: swift

            .. output::
               :language: console

               Sync: Connection[1]: Session[1]: Received: ERROR "Client attempted a 
               write that is outside of permissions or query filters; it has been 
               reverted" (error_code=231, try_again=true, error_action=Warning)

     - id: typescript
       content: |

         .. literalinclude::  /examples/MissingPlaceholders/example.ts
            :language: typescript
