using System;
using System.Collections.ObjectModel;
using System.Linq;
using Realms;
using Realms.Sync;
using Xamarin.Forms;

namespace realm_tutorial_dotnet
{
    public partial class ProjectPage : ContentPage
    {
        ActivityIndicator activityIndicator;
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
            OnStart();
        }

        private async void OnStart()
        {
            if (App.realmApp.CurrentUser == null)
            {
                var loginPage = new LoginPage();
                loginPage.OperationCompeleted += LoginPage_OperationCompeleted;
                await Navigation.PushAsync(loginPage);
            }
            else
            {
                try
                {
                    var syncConfig = new SyncConfiguration(
                        $"user={ App.realmApp.CurrentUser.Id }",
                        App.realmApp.CurrentUser);
                    // :code-block-start:user-realm-config
                    // :hide-start:
                    userRealm = await Realm.GetInstanceAsync(syncConfig);
                    // :replace-with:
                    //// TODO: instatiate the userRealm by calling GetInstanceAsync
                    //// userRealm = await ...
                    // :hide-end:
                    // :code-block-end:
                    // :code-block-start:find-user
                    // :hide-start:
                    user = userRealm.All<User>().ToList().Where(u => u.Id ==
                        App.realmApp.CurrentUser.Id).FirstOrDefault();
                    // :replace-with:
                    //// TODO: find the user in the userRealm
                    //// start with userRealm.All<User>(). and use ToList() and Where()
                    // :hide-end:
                    // :code-block-end:
                    if (user != null) SetUpProjectList();
                }
                catch (Exception ex)
                {
                    await DisplayAlert("Error Loading Projects", ex.Message, "OK");
                }
            }
        }

        private void LoginPage_OperationCompeleted(object sender, EventArgs e)
        {
            (sender as LoginPage).OperationCompeleted -= LoginPage_OperationCompeleted;
            OnStart();
        }

        private void MemberPage_OperationCompeleted(object sender, EventArgs e)
        {
            (sender as LoginPage).OperationCompeleted -= MemberPage_OperationCompeleted;
            OnStart();
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
                if (App.realmApp.CurrentUser != null)
                {
                    await App.realmApp.CurrentUser.LogOutAsync();
                    var loginPage = new LoginPage();
                    loginPage.OperationCompeleted += LoginPage_OperationCompeleted;
                    await Navigation.PushAsync(loginPage);
                }
            } catch (Exception ex)
            {
                await DisplayAlert("Error", ex.Message, "Logout Failed");
            }
        }

        protected override void OnAppearing()
        {
            if (user!=null) SetUpProjectList();
            base.OnAppearing();
        }
    }
}