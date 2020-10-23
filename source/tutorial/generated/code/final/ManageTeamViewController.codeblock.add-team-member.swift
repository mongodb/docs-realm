func addTeamMember(email: String) {
    print("Adding member: \(email)")
    activityIndicator.startAnimating()
    let user = app.currentUser!
    
    user.functions.addTeamMember([AnyBSON(email)], self.onTeamMemberOperationComplete)
}