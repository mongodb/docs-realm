Use the :java-sdk:`@RealmClass <io/realm/annotations/RealmClass.html>`
annotation to rename a class.

.. include:: /examples/generated/java/local/FrogClassRenamePolicyExampleKt.snippet.complete.kt.rst

Use the :java-sdk:`@RealmField <io/realm/annotations/RealmField.html>`
annotation to rename a field.

.. include:: /examples/generated/java/local/FrogRenameAFieldExampleKt.snippet.complete.kt.rst

Alternatively, you can also assign a naming policy at the module or
class levels to change the way that the SDK interprets field names.

You can define a
:java-sdk:`naming policy <io/realm/annotations/RealmNamingPolicy.html>`
at the :ref:`module level <sdks-provide-a-subset-of-models-to-a-database>`,
which affects all classes included in the module.
