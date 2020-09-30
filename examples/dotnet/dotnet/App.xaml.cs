using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace dotnet
{
    public partial class App : Application
    {
        public App(string appId)
        {
            InitializeComponent();

            MainPage = new MainPage();
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
