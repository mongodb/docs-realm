using System;
using System.Threading.Tasks;
using Realms.Sync;
using Xamarin.Forms;

namespace realm_tutorial_dotnet
{
    public partial class LoginPage : ContentPage
    {
        private string email;
        private string password;
        private User user;

        public LoginPage()
        {
            InitializeComponent();
        }

        void Login_Button_Clicked(object sender, EventArgs e)
        {
            DoLogin();
        }

        public event EventHandler<EventArgs> OperationCompeleted;

        private async void DoLogin()
        {
            try
            {
                // :code-block-start:login-async
                // :hide-start:
                var user = await App.realmApp.LogInAsync(Credentials.EmailPassword(email, password));
                // :replace-with:
                //// TODO: pass the email and password properties to LogInAsync
                //// user = await ...
                // :hide-end:
                // :code-block-end:
                if (user != null)
                {
                    OperationCompeleted?.Invoke(this, EventArgs.Empty);
                    await Navigation.PopAsync();
                    return;
                }
                else
                {
                    HandleFailure();
                }
            }catch (Exception ex)
            {
                await DisplayAlert("Login Failed", ex.Message, "OK");
            }
        }
        void Register_Button_CLicked(object sender, EventArgs e)
        {
            RegisterUser();
        }

        private async void RegisterUser()
        {
            try
            {
                // :code-block-start:register-user
                // :hide-start:
                await App.realmApp.EmailPasswordAuth.RegisterUserAsync(email, password);
                // :replace-with:
                //// TODO: pass the email and password properties to RegisterUserAsync
                // :hide-end:
                // :code-block-end:
                DoLogin();
            } catch (Exception ex)
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

        private void HandleFailure()
        {
            //throw new NotImplementedException();
        }
    }
}
