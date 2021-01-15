using System;
using RealmDotnetTutorial.Models;
using Realms;
using Xamarin.Forms;

namespace RealmDotnetTutorial
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

        public event EventHandler<EventArgs> OperationCompeleted = delegate { };

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

        async void Cancel_Button_Clicked(object sender, EventArgs e)
        {
            OperationCompeleted(this, EventArgs.Empty);
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
            OperationCompeleted(this, EventArgs.Empty);
            await Navigation.PopAsync();

            realm.Dispose();
            return;
        }
    }
}