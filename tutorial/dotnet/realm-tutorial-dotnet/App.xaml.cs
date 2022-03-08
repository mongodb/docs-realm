using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using Realms.Sync;

namespace RealmDotnetTutorial
{
    public partial class App : Application
    {
        // :uncomment-start:
        // private const string appId = "<my_realm_app_id>";
        // :uncomment-end:
        // :remove-start:
        private const string appId = "tasktracker-dkkvt";
        // :remove-end:
        public static Realms.Sync.App RealmApp;

        public App()
        {
            InitializeComponent();
        }

        protected override void OnStart()
        {
            // :code-block-start:open-realm
            // :state-start: final
            RealmApp = Realms.Sync.App.Create(appId);
            //:state-end: :state-uncomment-start: start
            //// TODO: call Realms.Sync.App.Create()
            // :state-uncomment-end:
            // :code-block-end:
            if (App.RealmApp.CurrentUser == null)
            {
                MainPage = new NavigationPage(new LoginPage());
            }
            else
            {
                MainPage = new NavigationPage(new ProjectPage());
            }
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }

    public static class Constants
    {
        public static bool AlreadyWarnedAboutBackendSetup { get; set; }
    }
}
