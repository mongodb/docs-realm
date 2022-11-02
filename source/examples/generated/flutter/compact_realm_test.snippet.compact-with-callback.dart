var config = Configuration.local([Car.schema],
    shouldCompactCallback: ((totalSize, usedSize) {
  // shouldCompactCallback sizes are in bytes.
  // For convenience, this example defines a const
  // representing a byte to MB conversion for compaction
  // at an arbitrary 10MB file size.
  const tenMB = 10 * 1024 * 1024;
  return totalSize > tenMB;
}));
var realm = Realm(config);
