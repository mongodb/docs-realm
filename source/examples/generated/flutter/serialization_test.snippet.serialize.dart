// Serialize to ejson by passing the object as a paramter to the method or ...
EJsonValue serializeByParam = toEJson(spider);

// ... by calling the method directly on the object
EJsonValue serializeWithCall = spider.toEJson();