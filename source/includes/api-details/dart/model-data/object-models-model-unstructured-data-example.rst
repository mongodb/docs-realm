.. literalinclude:: /examples/generated/flutter/define_realm_model_test.snippet.unstructured-data-model.dart
   :language: dart
   :emphasize-lines: 10
   :caption: Data model

.. io-code-block::
   :copyable: true
   :caption: Create unstructured data

   .. input:: /examples/generated/flutter/define_realm_model_test.snippet.create-unstructured-data-example.dart
      :language: dart

   .. output::
      :language:  shell

      Event Type: purchase
      Timestamp: 2024-03-18 13:50:58.402979Z
      User ID: user123
      Details:
      Item:
         ipAddress: RealmValue(192.168.1.1)
         items: RealmValue([RealmValue({id: RealmValue(1), name: RealmValue(Laptop), price: RealmValue(1200.0)}), RealmValue({id: RealmValue(2), name: RealmValue(Mouse), price: RealmValue(49.99)})])
         total: RealmValue(1249.99)
