int main() {
    // Set up a custom scheduler
    auto scheduler = realm::NoPlatformScheduler::make();
    
    // Pass the scheduler instance to the realm configuration
    auto config = realm::db_config{
        std::nullopt, scheduler
    };
    
    // Start the program main loop
    auto done = false;
    while (!done) {
        // As long as scheduler is in scope, looper is active
        // and automatically processing events on a background thread.
        
        // Handle input here
        // ...
        if (shouldQuitProgram) {
            done = true;
        }
    }
}
