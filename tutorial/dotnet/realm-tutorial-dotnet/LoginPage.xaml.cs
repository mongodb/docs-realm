﻿using System;
using AsyncTask = System.Threading.Tasks.Task;
using Realms.Sync;
using Xamarin.Forms;

namespace RealmDotnetTutorial
{
    public partial class LoginPage : ContentPage
    {
        private string email;
        private string password;

        public LoginPage()
        {
            InitializeComponent();
        }

        async void Login_Button_Clicked(object sender, EventArgs e)
        {
            await DoLogin();
        }

        private async AsyncTask DoLogin()
        {
            try
            {
                // :code-block-start:login-async
                // :state-start: final
                var user = await App.realmApp.LogInAsync(Credentials.EmailPassword(email, password));
                // :state-end: :state-uncomment-start: start
                //// TODO: pass the email and password properties to LogInAsync
                //// user = await ...
                // :state-uncomment-end:
                // :code-block-end:
                if (user != null)
                {
                    var projectPage = new ProjectPage();
                    await Navigation.PushAsync(projectPage);
                }
                else throw new Exception();
            }
            catch (Exception ex)
            {
                await DisplayAlert("Login Failed", ex.Message, "OK");
            }
        }
        async void Register_Button_CLicked(object sender, EventArgs e)
        {
            await RegisterUser();
        }

        private async AsyncTask RegisterUser()
        {
            try
            {
                // :code-block-start:register-user
                // :state-start: final
                await App.realmApp.EmailPasswordAuth.RegisterUserAsync(email, password);
                // :state-end: :state-uncomment-start: start
                //// TODO: pass the email and password properties to RegisterUserAsync
                // :state-uncomment-end:
                // :code-block-end:
                await DoLogin();
            }
            catch (Exception ex)
            {
                await DisplayAlert("Registration Failed", ex.Message, "OK");
            }
        }

        void Email_Entry_Completed(object sender, EventArgs e)
        {
            email = ((Entry)sender).Text;
        }

        void Password_Entry_Completed(object sender, EventArgs e)
        {
            password = ((Entry)sender).Text;
        }

    }
}
