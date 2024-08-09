When you read an :swift-sdk:`AnyRealmValue <Enums/AnyRealmValue.html>`
property, check the value's type before doing anything with it. The SDK
provides an :swift-sdk:`AnyRealmValue enum <Enums/AnyRealmValue.html>` that
iterates through all of the types the ``AnyRealmValue`` can store.

You can :ref:`compare <sdks-swift-where-comparison-operators>` these mixed
value types:

- Numeric: int, bool, float, double, decimal
- Byte-based: string, binary
- Time-based: timestamp, objectId

When using the ``AnyRealmValue`` mixed data type, keep these things in mind:

- ``equals`` queries match on value and type
- ``not equals`` queries match objects with either different values or 
  different types
- The SDK converts comparable numeric properties where possible. For example,
  in a mixed type field, 1 matches all of 1.0, 1, and true.
- String properties do not match numeric queries. For example, in a mixed
  type field, 1 does not match "1". "1" does not match 1, 1.0, or true.
