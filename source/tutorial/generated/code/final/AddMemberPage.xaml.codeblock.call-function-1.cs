teamMembers = await App.RealmApp.CurrentUser.Functions.CallAsync<List<Member>>("getMyTeamMembers");
