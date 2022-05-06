let auditSyncUser = await login()
var config = user.configuration(partitionValue: "Some partition value")
config.auditConfiguration = AuditConfiguration(metadata: ["username": "Jason Bourne"], syncUser: auditSyncUser, partitionPrefix: "audit-")
