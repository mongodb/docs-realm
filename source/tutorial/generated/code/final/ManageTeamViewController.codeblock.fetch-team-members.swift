// Calls a Realm function to fetch the team members and adds them to the list
func fetchTeamMembers() {
    // Start loading indicator
    activityIndicator.startAnimating()
    app.currentUser!.functions.getMyTeamMembers([]) { [weak self](result, error) in
        DispatchQueue.main.sync {
            guard self != nil else {
                // This can happen if the view is dismissed 
                // before the operation completes
                print("Team members list no longer needed.");
                return
            }
            // Stop loading indicator
            self!.activityIndicator.stopAnimating()
            guard error == nil else {
                print("Fetch team members failed: \(error!.localizedDescription)")
                return
            }
            print("Fetch team members complete.")
            
            // Convert documents to members array
            self!.members = result!.arrayValue!.map({ (bson) in
                return Member(document: bson!.documentValue!)
            })
            
            // Notify UI of changed data
            self!.tableView.reloadData()
        }
    }
}