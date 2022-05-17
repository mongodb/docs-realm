let eventSyncUser = await login()
var config = user.configuration(partitionValue: "Some partition value")
config.eventConfiguration = EventConfiguration(metadata: ["username": "Jason Bourne"], syncUser: eventSyncUser, partitionPrefix: "event-")
