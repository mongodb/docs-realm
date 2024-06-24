MyObject.counter.increment();
MyObject.counter.value; // 1
MyObject.counter.increment(2);
MyObject.counter.value; // 3
MyObject.counter.decrement(2);
MyObject.counter.value; // 1
MyObject.counter.increment(-2);
MyObject.counter.value; // -1

MyObject.counter.set(0); // reset counter value to 0
