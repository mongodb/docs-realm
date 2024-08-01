Async/Await
```````````

If your application uses async/await, you don't need the ``onComplete`` 
block. The update executes asynchronously and throws an 
error if the update cannot complete successfully.

.. code-block:: swift

   @MainActor
   func changeSubscription() async throws {
      let subscriptions = realm.subscriptions
      try await subcriptions.update {
         subscriptions.remove {
            QuerySubscription<Task> {
               $0.assignee == "Joe Doe"
            }
         }
      }
   }

Completion
``````````

If your application does not use Swift's async/await feature, you can react 
to subscription changes syncing with the server using the ``onComplete`` 
block. This block is called after subscriptions are synchronized with the 
server. If you want to react to subscription state changes by redrawing a 
UI, for example, or taking another action based on changes to the data set, 
take those actions in ``onComplete``. This is also where you can handle 
optional errors that occur during synchronization.

