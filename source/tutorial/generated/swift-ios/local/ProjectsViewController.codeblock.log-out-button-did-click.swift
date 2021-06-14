@objc func logOutButtonDidClick() {
    let alertController = UIAlertController(title: "Log Out", message: "", preferredStyle: .alert)
    alertController.addAction(UIAlertAction(title: "Yes, Log Out", style: .destructive, handler: {
        _ -> Void in
        print("Logging out...")
        self.navigationController?.popViewController(animated: true)
        // TODO: log out the current user
    }))
    alertController.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
    self.present(alertController, animated: true, completion: nil)
}
