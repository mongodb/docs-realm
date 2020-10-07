func removeTeamMember(email: String) {
    print("Removing member: \(email)")
    activityIndicator.startAnimating()
    app.currentUser!.functions.removeTeamMember([AnyBSON(email)!], self.onTeamMemberOperationComplete)
}