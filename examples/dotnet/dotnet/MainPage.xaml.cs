using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using Realms;

namespace dotnet
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        public void ListTasks(List<Task> tasks) {
            taskList.ItemsSource = tasks;
        }

    }
}
