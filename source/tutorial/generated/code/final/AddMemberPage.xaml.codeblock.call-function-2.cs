var functionResult = await App.RealmApp.CurrentUser.Functions.CallAsync<FunctionResult>("addTeamMember", result);
