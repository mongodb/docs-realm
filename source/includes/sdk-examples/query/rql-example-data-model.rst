.. tabs-drivers::

   tabs:
     - id: cpp
       content: |

         .. literalinclude:: /examples/generated/cpp/asymmetric-sync.snippet.create-asymmetric-object.cpp
           :language: cpp

     - id: csharp
       content: |

         .. literalinclude:: /examples/generated/dotnet/RqlSchemaExamples.snippet.rql-schema-examples.cs
            :language: csharp

     - id: dart
       content: |

         .. literalinclude:: /examples/generated/flutter/task_project_models_test.snippet.task-project-models.dart
            :language: dart

     - id: java
       content: |

          .. code-block:: java

            public class Item extends RealmObject {
              ObjectId id = new ObjectId();
              String name;
              Boolean isComplete = false;
              String assignee;
              Integer priority = 0;
              Integer progressMinutes = 0;
              @LinkingObjects("items")
              final RealmResults<Project> projects = null;
            }
            public class Project extends RealmObject {
              ObjectId id = new ObjectId();
              String name;
              RealmList<Item> items;
              Integer quota = null;
            }

     - id: javascript
       content: |

         .. literalinclude:: /examples/generated/node/rql-data-models.snippet.rql-data-models.js
             :language: javascript

     - id: kotlin
       content: |

         .. literalinclude:: /examples/generated/kotlin/RQLTest.snippet.rql-schema-example.kt
            :language: kotlin

     - id: objectivec
       content: |

         .. literalinclude:: /examples/MissingPlaceholders/api.m
            :language: objectivec

     - id: swift
       content: |

         .. literalinclude:: /examples/MissingPlaceholders/api.swift
            :language: swift

     - id: typescript
       content: |

         .. include::  /examples/generated/node/v12/formatted/rql-data-models.snippet.rql-data-models.ts.rst
