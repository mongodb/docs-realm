﻿using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using Realms.Sync;

namespace RealmDotnetTutorial
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
            // :state-start: final
            realmApp = Realms.Sync.App.Create(appId);
            //:state-end: :state-uncomment-start: start
            //// TODO: call Realms.Sync.App.Create()
            // :state-uncomment-end:
            // :code-block-end:
            if (App.realmApp.CurrentUser == null)
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
}
