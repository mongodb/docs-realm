.. code-block:: java

   realm.executeTransactionAsync(new Realm.Transaction() {
       @Override
       public void execute(Realm realm) {
           Sample sample = new Sample();
           sample.stringField = "Sven";
           realm.copyToRealm(sample);
       }
   });
