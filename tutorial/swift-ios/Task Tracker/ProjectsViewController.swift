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
    var userData: User?
    var notificationToken: NotificationToken?

    init(userRealmConfiguration: Realm.Configuration) {
        // :code-block-start: user-in-realm-notification
        // :state-start: local start
        // TODO: fetch user data object
        // :state-end: :state-start: sync
        self.userRealm = try! Realm(configuration: userRealmConfiguration)
        // :state-end:
        super.init(nibName: nil, bundle: nil)
        // :state-start: sync
        // There should only be one user in my realm - that is myself
        let usersInRealm = userRealm.objects(User.self)
        notificationToken = usersInRealm.observe { [weak self, usersInRealm] (_) in
            self?.userData = usersInRealm.first
            guard let tableView = self?.tableView else { return }
            tableView.reloadData()
        }
        // :state-end:
        // :code-block-end:
    }
    

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    // :code-block-start: invalidate-token
    // :state-uncomment-start: sync
    // deinit {
    //     // Always invalidate any notification tokens when you are done with them.
    //     notificationToken?.invalidate()
    // }
    // :state-uncomment-end:
    // :state-start: local start
    // TODO: deinit method
    // :state-end:
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
        let alertController = UIAlertController(title: "Log Out", message: "", preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "Yes, Log Out", style: .destructive, handler: {
            _ -> Void in
            print("Logging out...")
            self.navigationController?.popViewController(animated: true)
            // :state-start: start local
            // TODO: log out the current user
            // :state-end: :state-uncomment-start: sync
            // app.currentUser?.logOut { (_) in
            //     DispatchQueue.main.async {
            //         print("Logged out!")
            //         self.navigationController?.popViewController(animated: true)
            //     }
            // }
            // :state-uncomment-end:
        }))
        alertController.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        self.present(alertController, animated: true, completion: nil)
    }
    // :code-block-end:

    // :code-block-start: number-of-rows-in-section
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // :state-start: local start
        // You always have one project (your own)
        return 1 // TODO: calculate number of rows based on user data
        // :state-end:
        // :state-uncomment-start: sync
        // // You always have at least one project (your own)
        // return userData?.memberOf.count ?? 1
        // :state-uncomment-end:
    }
    // :code-block-end:

    // :code-block-start: cell-for-row-at
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell") ?? UITableViewCell(style: .default, reuseIdentifier: "Cell")
        cell.selectionStyle = .none

        // :state-start: local start
        // TODO: load data about projects that the user can access
        // :state-end: :state-uncomment-start: sync
        // //  User data may not have loaded yet. You always have your own project.
        // let projectName = userData?.memberOf[indexPath.row].name ?? "My Project"
        // cell.textLabel?.text = projectName
        // :state-uncomment-end:

        return cell
    }
    // :code-block-end:

    // :code-block-start: did-select-row-at
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        // :state-start: local start
        // TODO: open the realm for the selected project and navigate to the TasksViewController.
        // The project information is contained in the userData's memberOf field.
        // The userData may not have loaded yet. Regardless, the current user always has their own project.
        // A user's realm name is "project=username".
        // :state-end: :state-uncomment-start: sync
        // let user = app.currentUser!
        // let project = userData?.memberOf[indexPath.row] ?? Project(partition: "project=\(user.id)", name: "My Project")
        // let configuration = user.configuration(partitionValue: project.partition!)
        // Realm.asyncOpen(configuration: configuration) { [weak self] (result) in
        //     switch result {
        //     case .failure(let error):
        //         fatalError("Failed to open realm: \(error)")
        //     case .success(let realm):
        //         self?.navigationController?.pushViewController(
        //             TasksViewController(realmConfiguration: configuration, title: "\(project.name!)'s Tasks"),
        //             animated: true
        //         )
        //     }
        // }
        // :state-uncomment-end:
    }
    // :code-block-end:
}
