func removeTeamMember(email: String) {
    print("Removing member: \(email)")
    activityIndicator.startAnimating()
    let user = app.currentUser!
    
    user.functions.removeTeamMember([AnyBSON(email)], self.onTeamMemberOperationComplete)
}