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
                // :state-start: final
                teamMembers = await App.RealmApp.CurrentUser.Functions.CallAsync<List<Member>>("getMyTeamMembers");
                // :state-end: :state-uncomment-start: start
                //// TODO: Call the "getMyTeamMembers" to get all team members
                //// teamMembers = await ...
                // :state-uncomment-end:
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
                // :state-start: final
                var result = await App.RealmApp.CurrentUser.Functions.CallAsync("removeTeamMember", email.ToString());
                // :state-end: :state-uncomment-start: start
                //// TODO: Pass email.ToString() to the "removeTeamMember"
                //// function.
                //// var result = await ...
                // :state-uncomment-end:
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
                    // :state-start: final
                    var functionResult = await App.RealmApp.CurrentUser.Functions.CallAsync<FunctionResult>("addTeamMember", result);
                    // :state-end: :state-uncomment-start: start
                    //// TODO: Pass the result object to the "addTeamMember" 
                    //// function.
                    // :state-uncomment-end:
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
