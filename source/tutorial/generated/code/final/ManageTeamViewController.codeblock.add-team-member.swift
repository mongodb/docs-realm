func addTeamMember(email: String) {
    print("Adding member: \(email)")
    activityIndicator.startAnimating()
    app.currentUser!.functions.addTeamMember([AnyBSON(email)!], self.onTeamMemberOperationComplete)
}