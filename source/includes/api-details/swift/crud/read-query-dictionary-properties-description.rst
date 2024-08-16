You can iterate and check the values of a realm :swift-sdk:`map <Classes/Map.html>` 
as you would a standard :apple:`Dictionary <documentation/swift/dictionary>`.

.. tip:: Map may contain keys whose values are nil

   An SDK map may contain keys with ``nil`` values. If you delete an object
   that is used as a map value, the value is set to ``nil`` but the key
   remains unless you explicitly delete it. If your app deletes map values
   without also explicitly cleaning up the keys, you may need to perform
   optional unwrapping when you read map values.
