teamMembers = await App.RealmApp.CurrentUser.Functions.CallAsync<List<User>>("getMyTeamMembers");
