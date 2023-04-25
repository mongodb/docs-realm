import Realm from "realm";

describe.skip("test compaction on launch", () => {
  test("shouldCompact", async () => {
    let wasCalled;

    // TODO: Test that realm is compacted once it meets criteria

    //:snippet-start: shouldCompactNode

    const shouldCompact = (totalBytes, usedBytes) => {
      // totalBytes refers to the size of the file on disk in bytes (data + free space)
      // usedBytes refers to the number of bytes used by data in the file
      //:remove-start:
      wasCalled = true;
      //:remove-end:

      // Compact if the file is over 100MB in size and less than 50% 'used'
      const oneHundredMB = 100 * 1024 * 1024;

      return totalBytes > oneHundredMB && usedBytes / totalBytes < 0.5;
    };

    const config = { shouldCompact };

    let realm = await Realm.open(config);

    //:snippet-end:
    expect(wasCalled).toBe(true);

    realm.close();
  });

  test("shouldCompact works as it should", async () => {
    let wasCalled;

    // TODO: Test that realm is compacted once it meets criteria

    const RockSchema = {
      name: "Rock",
      properties: {
        name: "string",
        luster: "int",
      },
    };

    const shouldCompact = (totalBytes, usedBytes) => {
      // totalBytes refers to the size of the file on disk in bytes (data + free space)
      // usedBytes refers to the number of bytes used by data in the file
      wasCalled = true;

      // Compact if the file is over 10KB in size and less than 50% 'used'
      const tenKB = 10 * 1024;
      console.debug("used " + usedBytes);
      console.debug("total " + totalBytes);
      console.debug(totalBytes > tenKB && usedBytes / totalBytes < 0.5);
      return totalBytes > tenKB && usedBytes / totalBytes < 0.5;
    };

    const config = {
      path: "realm-files/compacting-realm",
      schema: [RockSchema],
      shouldCompact,
    };

    let testRealm = await Realm.open(config);

    testRealm.close();
  });

  test("compact", async () => {
    // TODO: Test that realm is compacted once it meets criteria

    //:snippet-start: compactNode
    const realm = new Realm("my.realm");
    realm.compact();
    //:snippet-end:
    expect(() => {
      realm.compact();
    });

    realm.close();
  });
});
