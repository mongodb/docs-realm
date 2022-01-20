.. code-block:: java
   :emphasize-lines: 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

   realm.getSubscriptions().update(new SubscriptionSet.UpdateCallback() {
       @Override
       public void update(MutableSubscriptionSet subscriptions) {
           Subscription mySubscription = subscriptions.find("mySubscription");
           subscriptions.remove(mySubscription);
       }
   });
