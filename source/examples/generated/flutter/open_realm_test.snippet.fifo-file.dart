var config = Configuration.local([Car.schema],
    fifoFilesFallbackPath: "./fifo_folder");
var realm = Realm(config);
