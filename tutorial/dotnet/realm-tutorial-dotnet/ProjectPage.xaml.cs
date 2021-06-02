using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
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
            WaitingLayout.IsVisible = false;
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

                if (user == null && !Constants.AlreadyWarnedAboutBackendSetup)
                {
                    // Either the trigger hasn't completed yet, has failed,
                    // or was never created on the backend
                    // So let's wait a few seconds and check again...
                    await System.Threading.Tasks.Task.Delay(5000);
                    user = userRealm.Find<User>(App.RealmApp.CurrentUser.Id);
                    if (user == null)
                    {
                        Console.WriteLine("NO USER OBJECT: This error occurs if " +
                            "you do not have the trigger configured on the backend " +
                            "or when there is a network connectivity issue. See " +
                            "https://docs.mongodb.com/realm/tutorial/realm-app/#triggers");

                        await DisplayAlert("No User object",
                            "The User object for this user was not found on the server. " +
                            "If this is a new user acocunt, the backend trigger may not have completed, " +
                            "or the tirgger doesn't exist. Check you backend set up and logs.", "OK");

                        Constants.AlreadyWarnedAboutBackendSetup = true;
                    }
                }
                SetUpProjectList();
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

            if (user == null || user.MemberOf == null)
            {
                MyProjects.Add(new Project("My New Project"));
                return;
            }
            foreach (Project p in user.MemberOf)
            {
                MyProjects.Add(p);
            }
            if (MyProjects.Count <= 0)
            {
                MyProjects.Add(new Project("No projects found!"));
            }
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