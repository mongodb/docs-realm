let configuration = AppConfiguration(
   baseURL: "https://realm.mongodb.com", // Custom base URL
   transport: nil, // Custom RLMNetworkTransportProtocol
   localAppName: "My App",
   localAppVersion: "3.14.159",
   defaultRequestTimeoutMS: 30000
)

let app = App(id: "my-app-services-app-id", configuration: configuration)
