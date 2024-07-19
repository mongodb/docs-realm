.. tabs-drivers::

   tabs:
     - id: cpp
       content: |

         .. literalinclude:: /examples/generated/cpp/filter-data.snippet.models.cpp
           :language: cpp-sdk

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

     - id: java-kotlin
       content: |

        .. code-block:: kotlin

          open class Item(): RealmObject() {
            var id: ObjectId = new ObjectId()
            @FullText
            lateinit var name: String
            var isComplete: Boolean = false
            var assignee: String? = null
            var priority: Int = 0
            var progressMinutes: Int = 0
          }

          open class Project(): RealmObject() {
            var id: ObjectId = new ObjectId()
            lateinit var name: String
            lateinit var items: RealmList<Item>
            var quota: Int? = null
          }

     - id: javascript
       content: |

         .. include:: /examples/generated/node/v12/formatted/rql-data-models.snippet.rql-data-models.js.rst

     - id: kotlin
       content: |

         .. literalinclude:: /examples/generated/kotlin/RQLTest.snippet.rql-schema-example.kt
            :language: kotlin

     - id: typescript
       content: |

         .. include:: /examples/generated/node/v12/formatted/rql-data-models.snippet.rql-data-models.ts.rst
