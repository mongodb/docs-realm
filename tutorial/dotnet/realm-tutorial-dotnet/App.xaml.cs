using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using Realms.Sync;

namespace realm_tutorial_dotnet
{
    public partial class App : Application
    {
        private const string appId = "<my_realm_app_id>";
        public static Realms.Sync.App realmApp;

        public App()
        {
            InitializeComponent();
        }

        protected override void OnStart()
        {
            // :code-block-start:open-realm
            // :hide-start:
            realmApp = Realms.Sync.App.Create(appId);
            //:replace-with:
            //// TODO: call Realms.Sync.App.Create()
            // :hide-end:
            // :code-block-end:
            MainPage = new NavigationPage(new ProjectPage());
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
