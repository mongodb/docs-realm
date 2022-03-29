// Initialize a serial queue, and
// perform realm operations on it
let serialQueue = DispatchQueue(label: "serial-queue")
serialQueue.async {
    let realm = try! Realm(configuration: .defaultConfiguration, queue: serialQueue)
    // Do something with Realm on the non-main thread
}
// This does not work. Realm does not support concurrent
// queues, and 'global()' is a concurrent queue.
// DispatchQueue.global().async {
//     autoreleasepool{
//          try! Realm()
//          // Do something with Realm on the non-main thread
//     }
// }
