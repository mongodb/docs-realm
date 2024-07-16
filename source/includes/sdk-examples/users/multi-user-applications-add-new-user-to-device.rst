.. tabs-drivers::

   tabs:
     - id: csharp
       content: |

         .. literalinclude:: /examples/generated/dotnet/MultiUserExamples.snippet.multi-add.cs
            :language: csharp

     - id: dart
       content: |

         .. literalinclude:: /examples/generated/flutter/authenticate_users_test.snippet.email-password-credentials.dart
            :language: dart

     - id: java
       content: |

         .. literalinclude:: /examples/generated/java/sync/MultipleUsersTest.snippet.add-a-new-user.java
            :language: java

     - id: java-kotlin
       content: |

         .. literalinclude:: /examples/generated/java/sync/MultipleUsersTest.snippet.add-a-new-user.kt
            :language: kotlin

     - id: javascript
       content: |

         .. literalinclude:: /examples/MultiUser/AddUser/AddUser.js
            :language: javascript

     - id: kotlin
       content: |

         In the following example, Joe logs in to the app and becomes the 
         active user. Then, Emma logs in and replaces Joe as the active user:

         .. io-code-block::

            .. input:: /examples/generated/kotlin/AuthenticationTest.snippet.add-a-new-user.kt
               :language:  kotlin

            .. output::
               :language: console 

               Successfully logged in. User state: LOGGED_IN. Current user is now: 65133e130075a51f12a9e635
               Successfully logged in. User state: LOGGED_IN. Current user is now: 65133e1357aaf22529343c1b

     - id: swift
       content: |

         .. literalinclude:: /examples/generated/code/start/MultipleUsers.snippet.add-user.swift
            :language: swift

     - id: typescript
       content: |

         .. literalinclude:: /examples/MultiUser/AddUser/AddUser.ts
            :language: typescript
