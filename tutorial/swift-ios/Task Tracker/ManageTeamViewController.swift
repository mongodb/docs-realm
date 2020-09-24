//
//  ManageTeamViewController.swift
//  Task Tracker
//
//  Created by MongoDB on 2020-07-30.
//  Copyright © 2020 MongoDB, Inc. All rights reserved.
//

import UIKit
import RealmSwift

class ManageTeamViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    let tableView = UITableView()
    var activityIndicator = UIActivityIndicatorView(style: .large)
    var members: [Member] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        
        title = "My Team"
        navigationItem.leftBarButtonItem = UIBarButtonItem(barButtonSystemItem: .close, target: self, action: #selector(closeButtonDidClick))
        navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(addButtonDidClick))
        
        tableView.dataSource = self
        tableView.delegate = self
        tableView.frame = self.view.frame
        
        view.addSubview(tableView)

        activityIndicator.center = view.center
        view.addSubview(activityIndicator)

        fetchTeamMembers();
    }

    @objc func closeButtonDidClick() {
        presentingViewController!.dismiss(animated: true)
    }
    
    @objc func addButtonDidClick() {
        let alertController = UIAlertController(title: "Add Team Member", message: "Enter your team member's email address.", preferredStyle: .alert)

        // When the user clicks the add button, present them with a dialog to enter the task name.
        alertController.addAction(UIAlertAction(title: "Add", style: .default, handler: {
            [weak self] alert -> Void in
            let textField = alertController.textFields![0]
            self!.addTeamMember(email: textField.text!)
        }))
        alertController.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        alertController.addTextField(configurationHandler: { (textField: UITextField!) -> Void in
            textField.placeholder = "someone@example.com"
        })

        // Show the dialog.
        self.present(alertController, animated: true, completion: nil)
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return members.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let member = members[indexPath.row]
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell") ?? UITableViewCell(style: .default, reuseIdentifier: "Cell")
        cell.selectionStyle = .none
        cell.textLabel?.text = member.name
        return cell
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        guard editingStyle == .delete else { return }
        removeTeamMember(email: members[indexPath.row].name)
    }
    
    // Calls a Realm function to fetch the team members and adds them to the list
    func fetchTeamMembers() {
        // Start loading indicator
        activityIndicator.startAnimating()
        app.functions.getMyTeamMembers([]) { [weak self](result, error) in
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
    
    func addTeamMember(email: String) {
        print("Adding member: \(email)")
        activityIndicator.startAnimating()
        app.functions.addTeamMember([AnyBSON(email)!], { [weak self] (result, realmError) in
            // There are two kinds of errors:
            // - The Realm function call itself failed (for example, due to network error)
            // - The Realm function call succeeded, but our business logic within the function returned an error,
            //   (for example, email not found).
            var errorMessage: String? = nil
            
            if (realmError != nil) {
                // Error from Realm (failed function call, network error...)
                errorMessage = realmError!.localizedDescription
            } else if let resultDocument = result?.documentValue {
                // Check for user error. The addTeamMember function we defined returns an object 
                // with the `error` field set if there was a user error.
                errorMessage = resultDocument["error"]??.stringValue
            } else {
                // The function call did not fail but the result was not a document.
                // This is unexpected.
                errorMessage = "Unexpected result returned from server"
            }
            
            // Log the success or failure to console.
            if (errorMessage == nil) {
                print("Successfully added user \(email)")
            } else {
                print("Failed to add user \(email): \(errorMessage!)")
            }
            
            // Now deal with the UI.
            DispatchQueue.main.sync {
                guard self != nil else {
                    return
                }

                // Always be sure to stop the activity indicator
                self!.activityIndicator.stopAnimating()
                
                // Present error message if any
                guard errorMessage == nil else {
                    let alertController = UIAlertController(
                        title: "Error",
                        message: "\(errorMessage!)",
                        preferredStyle: .alert
                    );
                    
                    alertController.addAction(UIAlertAction(title: "OK", style: .cancel))
                    self!.present(alertController, animated: true)
                    return
                }
                
                // Otherwise, fetch new team members list
                self?.fetchTeamMembers()
            }
        })
    }
    
    func removeTeamMember(email: String) {
        print("Removing member: \(email)")
        activityIndicator.startAnimating()
        app.functions.removeTeamMember([AnyBSON(email)!], { [weak self] (result, realmError) in
            // There are two kinds of errors:
            // - The Realm function call itself failed (for example, due to network error)
            // - The Realm function call succeeded, but our business logic within the function returned an error,
            //   (for example, user is not a member of the team).
            var errorMessage: String? = nil
            
            if (realmError != nil) {
                // Error from Realm (failed function call, network error...)
                errorMessage = realmError!.localizedDescription
            } else if let resultDocument = result?.documentValue {
                // Check for user error. The addTeamMember function we defined returns an object 
                // with the `error` field set if there was a user error.
                errorMessage = resultDocument["error"]??.stringValue
            } else {
                // The function call did not fail but the result was not a document.
                // This is unexpected.
                errorMessage = "Unexpected result returned from server"
            }
            
            // Log the success or failure to console.
            if (errorMessage == nil) {
                print("Successfully removed user \(email)")
            } else {
                print("Failed to remove user \(email): \(errorMessage!)")
            }
            
            // Now deal with the UI.
            DispatchQueue.main.sync {
                guard self != nil else {
                    return
                }

                // Always be sure to stop the activity indicator
                self!.activityIndicator.stopAnimating()
                
                // Present error message if any
                guard errorMessage == nil else {
                    let alertController = UIAlertController(
                        title: "Error",
                        message: "\(errorMessage!)",
                        preferredStyle: .alert
                    );
                    
                    alertController.addAction(UIAlertAction(title: "OK", style: .cancel))
                    self!.present(alertController, animated: true)
                    return
                }
                
                // Otherwise, fetch new team members list
                self?.fetchTeamMembers()
            }
        })
    }
}
