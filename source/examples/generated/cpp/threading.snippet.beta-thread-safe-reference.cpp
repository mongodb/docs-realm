// Put a managed realm object into a thread safe reference.
auto threadSafeItem =
    realm::thread_safe_reference<Item>{managedItem};

// Move the thread safe reference to a background thread.
auto thread =
    std::thread([threadSafeItem = std::move(threadSafeItem), path]() mutable {
      // Open the realm again on the background thread.
      auto backgroundConfig = realm::db_config();
      backgroundConfig.set_path(path);
      auto backgroundRealm = db(std::move(backgroundConfig));

      // Resolve the ThreadingExample_Item instance via the thread safe
      // reference.
      auto item = backgroundRealm.resolve(std::move(threadSafeItem));

      // ... use item ...
    });

// Wait for thread to complete.
thread.join();
