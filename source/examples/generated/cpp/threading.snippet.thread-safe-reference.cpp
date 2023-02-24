// Put an object instance into a thread safe reference
auto threadSafeThreadingExample_Item = realm::thread_safe_reference<ThreadingExample_Item>{item};

// Move the thread safe reference to a background thread
auto thread = std::thread([threadSafeThreadingExample_Item = std::move(threadSafeThreadingExample_Item)]() mutable {
    // Open the realm again on the background thread
    auto realm = realm::open<ThreadingExample_Item>();
    
    // Resolve the ThreadingExample_Item instance via the thread safe reference
    auto item = realm.resolve(std::move(threadSafeThreadingExample_Item));

    // ... use item ...
});

// Wait for thread to complete
thread.join();
