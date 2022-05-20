var config =
    Configuration([Car.schema], fifoFilesFallbackPath: "./fifo_folder");
var realm = Realm(config);
