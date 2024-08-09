When you read an :objc-sdk:`RLMValue <Protocols/RLMValue.html>`
property, check the value's type before doing anything with it. The SDK
provides an :objc-sdk:`RLMAnyValueType enum <Enums/RLMAnyValueType.html>` that
iterates through all of the types the ``RLMValue`` can store.

You can :ref:`compare <sdks-swift-nspredicate-comparison-operators>` these mixed
value types:

- Numeric: int, bool, float, double, ``RLMDecimal128``
- Byte-based: ``NSString``, ``NSData``
- Time-based: ``NSDate``, ``RLMObjectId``

When using the ``RLMValue`` mixed data type, keep these things in mind:

- ``equals`` queries match on value and type
- ``not equals`` queries match objects with either different values or 
  different types
- The SDK converts comparable numeric properties where possible. For example,
  in a mixed type field, 1 matches all of 1.0, 1, and true.
- String properties do not match numeric queries. For example, in a mixed
  type field, 1 does not match "1". "1" does not match 1, 1.0, or true.
