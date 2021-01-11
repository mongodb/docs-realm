using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Xamarin.Forms;

namespace realm_tutorial_dotnet
{
    public partial class AddMemberPage : ContentPage
    {
        
        private ObservableCollection<Member> _members = new ObservableCollection<Member>();

        public ObservableCollection<Member> Members
        {
            get
            {
                return _members;
            }
        }

        public event EventHandler<EventArgs> OperationCompeleted;

        public AddMemberPage()
        {
            InitializeComponent();
            OnStart();
        }

        private async void OnStart()
        {
            try
            {
                // :code-block-start:call-function-1
                // :hide-start:
                var teamMembers  = await App.realmApp.CurrentUser.Functions.CallAsync<List<Member>>("getMyTeamMembers");
                // :replace-with:
                //// TODO: Call the "getMyTeamMembers" to get all team members
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
                await DisplayAlert("Error", ex.Message, "Drat");
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
                // :hide-end:
                // :code-block-end:
                await DisplayAlert("Remove User", result.ToString(), "OK");
                listMembers.ItemsSource = Members;
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", ex.Message, "Drat");
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
                    await DisplayAlert("Error", ex.Message, "Drat");
                    return;
                }
                OnStart();
            }
            Complete();
        }

      

        async void Complete()
        {
            OperationCompeleted?.Invoke(this, EventArgs.Empty);
            await Navigation.PopAsync();
            return;
        }
    }

    class FunctionResult
    {
        public string error { get; set; }
        public int matchedCount { get; set; }
        public int modifiedCount { get; set; }

    }
}
