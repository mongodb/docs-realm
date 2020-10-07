@objc func logOutButtonDidClick() {
    let alertController = UIAlertController(title: "Log Out", message: "", preferredStyle: .alert);
    alertController.addAction(UIAlertAction(title: "Yes, Log Out", style: .destructive, handler: {
        alert -> Void in
        print("Logging out...");
        app.currentUser?.logOut() { (error) in
            DispatchQueue.main.sync {
                print("Logged out!");
                self.navigationController?.popViewController(animated: true)
            }
        }
    }))
    alertController.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
    self.present(alertController, animated: true, completion: nil)
}