You can link identities using :swift-sdk:`linkUser(credentials:)
<Extensions/User.html#/s:So7RLMUserC10RealmSwiftE8linkUser11credentials7Combine6FutureCyABs5Error_pGAC11CredentialsO_tF>`.
This links the identity that belongs to the credential to a logged-in ``User``
object.

.. literalinclude:: /examples/generated/code/start/MultipleUsers.snippet.link-identity.swift
   :language: swift

The SDK also provides an :swift-sdk:`async/await version of 
User.linkUser <Extensions/User.html#/s:So7RLMUserC10RealmSwiftE8linkUser11credentials7Combine6FutureCyABs5Error_pGAC11CredentialsO_tF>`.
