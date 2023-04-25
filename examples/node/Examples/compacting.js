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

    console.debug("bytes " + realm.usedBytes);

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
      return totalBytes > tenKB && usedBytes / totalBytes < 0.5;
    };

    const config = {
      path: "realm-files/compacting-realm",
      schema: [RockSchema],
    };

    let testRealm = await Realm.open(config);
    let size = testRealm.totalBytes;
    console.log("size", size);

    //expect(wasCalled).toBe(true);

    testRealm.write(() => {
      testRealm.create("Rock", {
        name: "Topaz",
        luster: 10,
      });
      testRealm.create("Rock", {
        name: "Sapphire",
        luster: 7,
      });
      testRealm.create("Rock", {
        name: "Ruby",
        luster: 6,
      });
      testRealm.create("Rock", {
        name: "Opal",
        luster: 9,
      });
      testRealm.create("Rock", {
        name: "Jade",
        luster: 10,
      });
      testRealm.create("Rock", {
        name: "Pearl",
        luster: 10,
      });
      testRealm.create("Rock", {
        name: "Granite",
        luster: 10,
      });
      testRealm.create("Rock", {
        name: "Tourmaline",
        luster: 5,
      });
      testRealm.create("Rock", {
        name: "Emerald",
        luster: 5,
      });
      for (let i = 0; i < 1; i++) {
        testRealm.create("Rock", {
          name: "Gemq " + i.toString(),
          luster: i,
        });
      }
    });

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
