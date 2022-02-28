.. code-block:: java

   public class Sample extends RealmObject {
       @PrimaryKey
       String stringField = "Realm";
       Byte byteField = 0xA;
       // no support for chars: no charField
       Short shortField = 17;
       Integer intField = 42;
       @Index
       Long longField = 256L;
       Boolean booleanField = true;
       Float floatField = 3.14f;
       Double doubleField = 1.19840122;
       Date timestampField = new Date();
   }
