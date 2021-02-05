﻿using System;
using System.Collections.ObjectModel;
using System.Linq;
using RealmDotnetTutorial.Models;
using Realms;
using Realms.Sync;
using Xamarin.Forms;
using AsyncTask = System.Threading.Tasks.Task;
using User = RealmDotnetTutorial.Models.User;

namespace RealmDotnetTutorial
{
    public partial class ProjectPage : ContentPage
    {
        private User user;
        private Realm userRealm;
        private ObservableCollection<Project> _projects = new ObservableCollection<Project>();

        public ObservableCollection<Project> MyProjects
        {
            get
            {
                return _projects;
            }
        }

        public ProjectPage()
        {
            InitializeComponent();
        }

        protected override async void OnAppearing()
        {
            WaitingLayout.IsVisible = true;
            if (App.RealmApp.CurrentUser == null)
            {
                // No user? Go back to the LoginPage
                await Navigation.PopAsync();
            }
            else
            {
                await LoadProjects();
            }
            base.OnAppearing();
        }

        private async AsyncTask LoadProjects()
        {
            try
            {
                var syncConfig = new SyncConfiguration(
                    $"user={ App.RealmApp.CurrentUser.Id }",
                    App.RealmApp.CurrentUser);
                // :code-block-start:user-realm-config
                // :state-start: final
                userRealm = await Realm.GetInstanceAsync(syncConfig);
                // :state-end: :state-uncomment-start: start
                //// TODO: instatiate the userRealm by calling GetInstanceAsync
                //// userRealm = await ...
                // :state-uncomment-end:
                // :code-block-end:
                // :code-block-start:find-user
                // :state-start: final
                user = userRealm.Find<User>(App.RealmApp.CurrentUser.Id);
                // :state-end: :state-uncomment-start: start
                //// TODO: find the user in the userRealm
                //// Because the user's ID is the Primary Key, we can easily
                //// find the user by passing the ID to userRealm.Find<User>().
                // :state-uncomment-end:
                // :code-block-end:
                if (user != null) SetUpProjectList();
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error Loading Projects", ex.Message, "OK");
            }
        }

        private async void MemberPage_OperationCompeleted(object sender, EventArgs e)
        {
            (sender as AddMemberPage).OperationCompeleted -= MemberPage_OperationCompeleted;
            await LoadProjects();
        }

        private void SetUpProjectList()
        {
            MyProjects.Clear();
            listProjects.ItemsSource = MyProjects;
            foreach (Project p in user.MemberOf)
            {
                MyProjects.Add(p);
            }
            if (MyProjects.Count <= 0)
            {
                MyProjects.Add(new Project("No projects found!"));
            }

; WaitingLayout.IsVisible = false;
        }

        void TextCell_Tapped(object sender, EventArgs e)
        {
            Navigation.PushAsync(new TaskPage());
        }

        async void Add_User_Button_Clicked(object sender, EventArgs e)
        {
            var memberPage = new AddMemberPage();
            memberPage.OperationCompeleted += MemberPage_OperationCompeleted;
            await Navigation.PushAsync(memberPage);
        }

        async void Logout_Button_Clicked(object sender, EventArgs e)
        {
            try
            {
                if (App.RealmApp.CurrentUser != null)
                {
                    await App.RealmApp.CurrentUser.LogOutAsync();
                    var loginPage = new LoginPage();
                    await Navigation.PushAsync(loginPage);
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", ex.Message, "Logout Failed");
            }
        }
    }
}