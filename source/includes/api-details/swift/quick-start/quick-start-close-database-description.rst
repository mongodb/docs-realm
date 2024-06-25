Unlike the other SDKs, there is no need to manually close a database in Swift
or Objective-C. When a database goes out of scope and is removed from memory
due to `ARC
<https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html>`__,
the database is automatically closed.
