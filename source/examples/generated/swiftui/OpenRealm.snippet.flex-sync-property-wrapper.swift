// We've injected a `flexibleSyncConfiguration` as an environment value,
// so `@AsyncOpen` here opens a realm using that configuration.
@AsyncOpen(appId: flexibleSyncAppId, timeout: 4000) var asyncOpen
