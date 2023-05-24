struct MyCustomLogger : realm::logger {
    virtual void do_log(realm::logger::level level, const std::string &msg) override {
        std::cout << "Realm log entry: " << msg << std::endl;
    }
};
