String appID = YOUR_APP_ID; // replace this with your App ID
SyncSession.ClientResetHandler handler = new SyncSession.ClientResetHandler() {
    @Override
    public void onClientReset(SyncSession session, ClientResetRequiredError error) {
        Log.e("EXAMPLE", "Client Reset required for: " +
                session.getConfiguration().getServerUrl() + " for error: " +
                error.toString());
    }
};
App app = new App(new AppConfiguration.Builder(appID)
        .defaultClientResetHandler(handler)
        .build());
