using System;
using System.Threading.Tasks;
using Realms;
using Realms.Sync;
using Xamarin.Forms;

namespace realm_tutorial_dotnet
{
    public partial class EditTaskPage : ContentPage
    {
        public Task TaskToEdit;
        private Realm realm;
        private string newName;
        private string newStatus;

        public EditTaskPage(Realm realm, Task task)
        {
            InitializeComponent();
            this.realm = realm;
            this.TaskToEdit = task;
            txtName.Text = task.Name;
            pickerStatus.SelectedIndex = SetIndex();
        }

        private int SetIndex()
        {
            switch (TaskToEdit.Status)
            {
                case "Open":
                    return 0;

                case "InProgress":
                    return 1;

                case "Closed":
                    return 2;
                default:
                    return 0;
            }
        }

        public event EventHandler<EventArgs> OperationCompeleted;

        void Name_Entry_Completed(object sender, EventArgs e)
        {
            newName = ((Entry)sender).Text;
        }

        void Status_Entry_Completed(object sender, EventArgs e)
        {

            switch (((Picker)sender).SelectedIndex)
            {
                case 0:
                    newStatus = Task.TaskStatus.Open.ToString();
                    break;
                case 1:
                    newStatus = Task.TaskStatus.InProgress.ToString();
                    break;
                case 2:
                    newStatus = Task.TaskStatus.Complete.ToString();
                    break;
            }

        }

        private void HandleFailure()
        {
            //throw new NotImplementedException();
        }

        async void Cancel_Button_Clicked(object sender, EventArgs e)
        {
            OperationCompeleted?.Invoke(this, EventArgs.Empty);
            await Navigation.PopAsync();
            return;
        }

        async void Save_Button_Clicked(object sender, EventArgs e)
        {
            realm.Write(() =>
            {
                TaskToEdit.Name = newName;
                TaskToEdit.Status = newStatus;
            });
            OperationCompeleted?.Invoke(this, EventArgs.Empty);
            await Navigation.PopAsync();

            realm.Dispose();
            return;
        }
    }
}