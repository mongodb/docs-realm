// Rudimentary scheduler example - NOT production ready
struct MyScheduler : realm::scheduler {
    MyScheduler(): _thread{[this] {
        // Kick off the task processor thread and run until the scheduler
        // goes out of scope.
        while (!_done) {
            // Get the next task in the queue if one is available
            std::optional<std::function<void()>> maybe_task = _queue.try_pop();
            if (maybe_task) {
                // Execute the task
                maybe_task.value()();
            }
            // Continue spinning the thread until we get a new task or
            // request to terminate
        }
    }} {};

    ~MyScheduler() override {
        // Call in the processor thread and block until it returns.
        _done = true;
        _thread.join();
    }
    
    void invoke(std::function<void()> &&task) override {
        // Add the task to the lock-free queue.
        _queue.push(std::move(task));
    }

    [[nodiscard]] bool is_on_thread() const noexcept override {
        // Return true if the caller is on the same thread as the task thread.
        return std::this_thread::get_id() == _thread.get_id();
    }

    bool is_same_as(const realm::scheduler *other) const noexcept override {
        // Compare scheduler instances.
        return this == other;
    }

    [[nodiscard]] bool can_invoke() const noexcept override {
        // As long as this scheduler is in scope, it can invoke.
        return !_done;
    }

private:
    std::thread _thread;
    std::atomic<bool> _done{false};
    // Lock-free queue implementations can be found online.
    LockFreeQueue<std::function<void()>> _queue;
};

int main() {
    // Set up a custom scheduler
    auto scheduler = std::make_shared<MyScheduler>();
    
    // Pass the scheduler instance to the realm configuration
    auto config = realm::db_config{
        std::nullopt, scheduler
    };
    
    // Start the program main loop
    auto done = false;
    while (!done) {
        // As long as scheduler is in scope, the processor thread
        // is active and automatically processing events.
        
        // Handle input here
        // ...
        if (shouldQuitProgram) {
            done = true;
        }
    }
}
