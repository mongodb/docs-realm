To create an FTS index on a property, use the `@Indexed 
<https://pub.dev/documentation/realm_common/latest/realm_common/Indexed-class.html>`__
annotation and specify the `RealmIndexType <https://pub.dev/documentation/realm_common/latest/realm_common/RealmIndexType.html>`__ 
as ``fullText``. This enables full-text queries on the property. In the 
following example, we mark the pattern and material properties with the FTS annotation:
