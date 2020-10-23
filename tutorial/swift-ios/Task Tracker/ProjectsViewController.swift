//
//  ProjectsViewController.swift
//
//
//  Created by MongoDB on 2020-05-04.
//

import Foundation
import UIKit
import RealmSwift

class ProjectsViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    let tableView = UITableView()
    let userRealm: Realm
    var notificationToken: NotificationToken?
    var userData: User?

    init(userRealm: Realm) {
        self.userRealm = userRealm

        super.init(nibName: nil, bundle: nil)

        // :code-block-start: user-in-realm-notification
        // :hide-start:
        // There should only be one user in my realm - that is myself
        let usersInRealm = userRealm.objects(User.self)

        notificationToken = usersInRealm.observe { [weak self, usersInRealm] (changes) in
            self?.userData = usersInRealm.first
            guard let tableView = self?.tableView else { return }
            tableView.reloadData()
        }
        // :replace-with:
        // // TODO: Observe user realm for user objects
        // :hide-end:
        // :code-block-end:
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    // :code-block-start: invalidate-token
    deinit {
        // :hide-start:
        // Always invalidate any notification tokens when you are done with them.
        notificationToken?.invalidate()
        // :replace-with:
        // // TODO: invalidate notificationToken
        // :hide-end:
    }
    // :code-block-end:

    override func viewDidLoad() {
        super.viewDidLoad()

        // Configure the view.
        title = "Projects"
        tableView.dataSource = self
        tableView.delegate = self
        tableView.frame = self.view.frame
        view.addSubview(tableView)

        // On the top left is a log out button.
        navigationItem.leftBarButtonItem = UIBarButtonItem(title: "Log Out", style: .plain, target: self, action: #selector(logOutButtonDidClick))
    }

    // :code-block-start: log-out-button-did-click
    @objc func logOutButtonDidClick() {
        let alertController = UIAlertController(title: "Log Out", message: "", preferredStyle: .alert);
        alertController.addAction(UIAlertAction(title: "Yes, Log Out", style: .destructive, handler: {
            alert -> Void in
            print("Logging out...");
            // :hide-start:
            app.currentUser?.logOut() { (error) in
                DispatchQueue.main.sync {
                    print("Logged out!");
                    self.navigationController?.popViewController(animated: true)
                }
            }
            // :replace-with:
            // // TODO: log out the app's currentUser, then, on the main thread, pop this
            // // view controller from the navigation controller to navigate back to
            // // the WelcomeViewController.
            // :hide-end:
        }))
        alertController.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        self.present(alertController, animated: true, completion: nil)
    }
    // :code-block-end:

    // :code-block-start: number-of-rows-in-section
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // :hide-start:
        // You always have at least one project (your own)
        return userData?.memberOf.count ?? 1
        // :replace-with:
        // // TODO: Each project should have its own row. Check the userData memberOf
        // // field for how many projects the user is a member of. However, the userData
        // // may not have loaded in yet. If that's the case, the user always has their
        // // own project, so you should always return at least 1.
        // return 0
        // :hide-end:
    }
    // :code-block-end:

    // :code-block-start: cell-for-row-at
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell") ?? UITableViewCell(style: .default, reuseIdentifier: "Cell")
        cell.selectionStyle = .none

        // :hide-start:
        // User data may not have loaded yet. You always have your own project.
        let projectName = userData?.memberOf[indexPath.row].name ?? "My Project"
        cell.textLabel?.text = projectName
        // :replace-with:
        // // TODO: Get project name using userData's memberOf field and indexPath.row.
        // // The userData may not have loaded yet. Regardless, you always have your own project.
        // let projectName = "TODO"
        // cell.textLabel?.text = projectName 
        // :hide-end:
        
        return cell
    }
    // :code-block-end:

    // :code-block-start: did-select-row-at
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        // :hide-start:
        let user = app.currentUser!
        let project = userData?.memberOf[indexPath.row] ?? Project(partition: "project=\(user.id)", name: "My Project")

        Realm.asyncOpen(configuration: user.configuration(partitionValue: project.partition!)) { [weak self] (result) in
            switch result {
            case .failure(let error):
                fatalError("Failed to open realm: \(error)")
            case .success(let realm):
                self?.navigationController?.pushViewController(
                    TasksViewController(realm: realm, title: "\(project.name!)'s Tasks"),
                    animated: true
                );
            }
        }
        // :replace-with:
        // // TODO: open the realm for the selected project and navigate to the TasksViewController.
        // // The project information is contained in the userData's memberOf field.
        // // The userData may not have loaded yet. Regardless, the current user always has their own project.
        // // A user's project partition value is "project=\(user.id!)". Use the user.configuration() with
        // // the project's partition value to open the realm for that project.
        // :hide-end: 
    }
    // :code-block-end:

}
