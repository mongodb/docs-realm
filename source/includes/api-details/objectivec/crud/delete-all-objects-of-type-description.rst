To delete all objects of a given object type from the database, pass
the result of :objc-sdk:`+[YourSDKObjectClass
allObjectsInRealm:]
<Classes/RLMObject.html#/c:objc(cs)RLMObject(cm)allObjectsInRealm:>`
to :objc-sdk:`-[Realm deleteObjects:]
<Classes/RLMRealm.html#/c:objc(cs)RLMRealm(im)deleteObjects:>`
inside of a write transaction. Replace ``YourSDKObjectClass``
with your SDK object class name.
