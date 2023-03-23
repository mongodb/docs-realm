// Put an object instance into a thread safe reference
auto threadSafeItem = realm::thread_safe_reference<Item>{item};

// Move the thread safe reference to a background thread
auto thread = std::thread([threadSafeItem = std::move(threadSafeItem)]() mutable {
    // Open the realm again on the background thread
    auto realm = realm::open<Item>();
    
    // Resolve the Item instance via the thread safe reference
    auto item = realm.resolve(std::move(threadSafeItem));

    // ... use item ...
});

// Wait for thread to complete
thread.join();
