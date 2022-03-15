.. code-block:: swift
   :emphasize-lines: 10

   @main
   struct ContentView: SwiftUI.App {
       var body: some Scene {
           WindowGroup {
               // Using Sync?
               if let app = app {
                   SyncContentView(app: app)
               } else {
                   LocalOnlyContentView()
                       .environment(\.realmConfiguration, config)
               }
           }
       }
   }
