.. tabs-drivers::

   tabs:
     - id: cpp
       content: |

         .. literalinclude:: /examples/MissingPlaceholders/example.cpp
            :language: cpp
            :copyable: false

     - id: csharp
       content: |

         While you can add a single query using ``SubscribeAsync``, you can
         only batch multiple queries within a ``SubscriptionSet.Update`` block.

         .. literalinclude:: /examples/generated/dotnet/FlexibleSyncExamples.snippet.update-multiple-subscriptions.cs
            :language: csharp

     - id: dart
       content: |

         .. literalinclude:: /examples/generated/flutter/manage_sync_subscription_test.snippet.add-subscription.dart
            :language: dart

     - id: java
       content: |

         .. literalinclude:: /examples/MissingPlaceholders/example.java
            :language: java
            :copyable: false

     - id: java-kotlin
       content: |

         .. literalinclude:: /examples/MissingPlaceholders/example-java-kotlin.kt
            :language: kotlin
            :copyable: false

     - id: javascript
       content: |

         .. literalinclude:: /examples/generated/node/flexible-sync.snippet.subscribe-to-queryable-fields.js
            :language: javascript

     - id: kotlin
       content: |

         .. literalinclude:: /examples/MissingPlaceholders/example.kt
            :language: kotlin
            :copyable: false

     - id: swift
       content: |

         .. literalinclude:: /examples/generated/code/start/FlexibleSync.snippet.add-multiple-subscriptions.swift
            :language: swift

     - id: typescript
       content: |

         .. literalinclude:: /examples/MissingPlaceholders/example.ts
            :language: typescript
            :copyable: false
