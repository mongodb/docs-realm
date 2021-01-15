using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using RealmDotnetTutorial.Models;
using Xamarin.Forms;

namespace RealmDotnetTutorial
{
    public partial class AddMemberPage : ContentPage
    {
        private List<Member> teamMembers;
        private ObservableCollection<Member> _members = new ObservableCollection<Member>();

        public ObservableCollection<Member> Members
        {
            get
            {
                return _members;
            }
        }

        public event EventHandler<EventArgs> OperationCompeleted = delegate { };

        public AddMemberPage()
        {
            InitializeComponent();
        }
        protected override async void OnAppearing()
        {
            try
            {
                // :code-block-start:call-function-1
                // :hide-start:
                teamMembers = await App.realmApp.CurrentUser.Functions.CallAsync<List<Member>>("getMyTeamMembers");
                // :replace-with:
                //// TODO: Call the "getMyTeamMembers" to get all team members
                //// teamMembers = await ...
                // :hide-end:
                // :code-block-end:
                foreach (var member in teamMembers)
                {
                    _members.Add(member);
                }
                listMembers.ItemsSource = Members;
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", ex.Message, "OK");
            }
        }

        async void Delete_Button_Clicked(object sender, EventArgs e)
        {
            var email = ((Button)sender).CommandParameter;
            try
            {
                // :code-block-start:call-function-3
                // :hide-start:
                var result = await App.realmApp.CurrentUser.Functions.CallAsync("removeTeamMember", email.ToString());
                // :replace-with:
                //// TODO: Pass email.ToString() to the "removeTeamMember"
                //// function.
                //// var result = await ...
                // :hide-end:
                // :code-block-end:
                await DisplayAlert("Remove User", result.ToString(), "OK");
                listMembers.ItemsSource = Members;
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", ex.Message, "OK");
            }
        }

        async void Add_Button_Clicked(object sender, EventArgs e)
        {
            string result = await DisplayPromptAsync("Add User to My Project", "User email:");
            if (result != null)
            {
                try
                {
                    // :code-block-start:call-function-2
                    // :hide-start:
                    var functionResult = await App.realmApp.CurrentUser.Functions.CallAsync<FunctionResult>("addTeamMember", result);
                    // :replace-with:
                    //// TODO: Pass the result object to the "addTeamMember" 
                    //// function.
                    // :hide-end:
                    // :code-block-end:
                }
                catch (Exception ex)
                {
                    await DisplayAlert("Error", ex.Message, "OK");
                    return;
                }
            }
            Complete();
        }

        async void Complete()
        {
            OperationCompeleted(this, EventArgs.Empty);
            await Navigation.PopAsync();
        }
    }

    class FunctionResult
    {
        public string Error { get; set; }
        public int MatchedCount { get; set; }
        public int ModifiedCount { get; set; }

    }
}
