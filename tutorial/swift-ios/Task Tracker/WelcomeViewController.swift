//
//  WelcomeViewController.swift
//  Task Tracker
//
//  Created by MongoDB on 2020-04-30.
//  Copyright © 2020-2021 MongoDB, Inc. All rights reserved.
//

import UIKit
import RealmSwift

// The WelcomeViewController handles login and account creation.
class WelcomeViewController: UIViewController {
    let usernameField = UITextField()
    // :code-block-start: password-field-and-sign-up-button
    // :state-uncomment-start: sync
    // let passwordField = UITextField()
    // :state-uncomment-end:
    let signInButton = UIButton(type: .roundedRect)
    // :state-uncomment-start: sync
    // let signUpButton = UIButton(type: .roundedRect)
    // :state-uncomment-end:
    // :code-block-end:
    let errorLabel = UILabel()
    let activityIndicator = UIActivityIndicatorView(style: .medium)

    var username: String? {
        get {
            return usernameField.text
        }
    }

    // :code-block-start: get-password
    // :state-uncomment-start: sync
    // var password: String? {
    //     get {
    //         return passwordField.text
    //     }
    // }
    // :state-uncomment-end:
    // :code-block-end:

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white

        // Create a view that will automatically lay out the other controls.
        let container = UIStackView()
        container.translatesAutoresizingMaskIntoConstraints = false
        container.axis = .vertical
        container.alignment = .fill
        container.spacing = 16.0
        view.addSubview(container)

        // Configure the activity indicator.
        activityIndicator.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(activityIndicator)

        // Set the layout constraints of the container view and the activity indicator.
        let guide = view.safeAreaLayoutGuide
        NSLayoutConstraint.activate([
            // This pins the container view to the top and stretches it to fill the parent
            // view horizontally.
            container.leadingAnchor.constraint(equalTo: guide.leadingAnchor, constant: 16),
            container.trailingAnchor.constraint(equalTo: guide.trailingAnchor, constant: -16),
            container.topAnchor.constraint(equalTo: guide.topAnchor, constant: 16),
            // The activity indicator is centered over the rest of the view.
            activityIndicator.centerYAnchor.constraint(equalTo: guide.centerYAnchor),
            activityIndicator.centerXAnchor.constraint(equalTo: guide.centerXAnchor)
            ])

        // Add some text at the top of the view to explain what to do.
        let infoLabel = UILabel()
        infoLabel.numberOfLines = 0
        // :code-block-start: info-label-password-add
        // :state-start: local start
        infoLabel.text = "Please enter a username."
        // :state-end: :state-uncomment-start: sync
        // infoLabel.text = "Please enter an email and password."
        // :state-uncomment-end:
        // :code-block-end:
        container.addArrangedSubview(infoLabel)

        // :code-block-start: username-field-placeholder
        // Configure the username text input field.
        // :state-start: local start
        usernameField.placeholder = "Username"
        // :state-end: :state-uncomment-start: sync
        // usernameField.placeholder = "Email"
        // :state-uncomment-end:
        // :code-block-end:
        usernameField.borderStyle = .roundedRect
        usernameField.autocapitalizationType = .none
        usernameField.autocorrectionType = .no
        container.addArrangedSubview(usernameField)

        // :code-block-start: password-field-configure
        // :state-uncomment-start: sync
        // // Configure the password text input field.
        // passwordField.placeholder = "Password"
        // passwordField.isSecureTextEntry = true
        // passwordField.borderStyle = .roundedRect
        // container.addArrangedSubview(passwordField)
        // :state-uncomment-end:
        // :code-block-end:
        
        // Configure the sign in button.
        signInButton.setTitle("Sign In", for: .normal)
        signInButton.addTarget(self, action: #selector(signIn), for: .touchUpInside)
        container.addArrangedSubview(signInButton)

        // :code-block-start: sign-up-button
        // :state-uncomment-start: sync
        // // Configure the sign up button.
        // signUpButton.setTitle("Sign Up", for: .normal)
        // signUpButton.addTarget(self, action: #selector(signUp), for: .touchUpInside)
        // container.addArrangedSubview(signUpButton)
        // :state-uncomment-end:
        // :code-block-end:
        
        // Error messages will be set on the errorLabel.
        errorLabel.numberOfLines = 0
        errorLabel.textColor = .red
        container.addArrangedSubview(errorLabel)
        
        // :state-start: sync
        // If already logged in, go straight to the projects page for the user
        let user = app.currentUser
        if (user != nil && user!.isLoggedIn) {
            let configuration = user!.configuration(partitionValue: "user=\(user!.id)")
            navigationController!.pushViewController(ProjectsViewController(userRealmConfiguration: configuration), animated: true)
        }
        // :state-end:
    }

    // Turn on or off the activity indicator.
    func setLoading(_ loading: Bool) {
        if loading {
            activityIndicator.startAnimating()
            errorLabel.text = ""
        } else {
            activityIndicator.stopAnimating()
        }
        
        // :code-block-start: password-field-enable
        usernameField.isEnabled = !loading
        // :state-uncomment-start: sync
        // passwordField.isEnabled = !loading
        // :state-uncomment-end:
        signInButton.isEnabled = !loading
        // :state-uncomment-start: sync
        // signUpButton.isEnabled = !loading
        // :state-uncomment-end:
        // :code-block-end:
    }

    // :code-block-start: sign-up
    // :state-start: local
    // :state-end: :state-uncomment-start: sync
    // @objc func signUp() {
    //     setLoading(true)
    //     app.emailPasswordAuth.registerUser(email: username!, password: password!, completion: { [weak self](error) in
    //         // Completion handlers are not necessarily called on the UI thread.
    //         // This call to DispatchQueue.main.async ensures that any changes to the UI,
    //         // namely disabling the loading indicator and navigating to the next page,
    //         // are handled on the UI thread:
    //         DispatchQueue.main.async {
    //             self!.setLoading(false)
    //             guard error == nil else {
    //                 print("Signup failed: \(error!)")
    //                 self!.errorLabel.text = "Signup failed: \(error!.localizedDescription)"
    //                 return
    //             }
    //             print("Signup successful!")
    //
    //             // Registering just registers. Now we need to sign in, but we can reuse the existing email and password.
    //             self!.errorLabel.text = "Signup successful! Signing in..."
    //             self!.signIn()
    //         }
    //     })
    // }
    // :state-uncomment-end:
    // :code-block-end:

    // :code-block-start: sign-in
    @objc func signIn() {
        // :state-start: local
        // Go to the list of tasks in the user object contained in the user realm.
        var config = Realm.Configuration.defaultConfiguration
        // This configuration step is not really needed, but if we add Sync later,
        // this allows us to keep the tasks we made.
        config.fileURL!.deleteLastPathComponent()
        config.fileURL!.appendPathComponent("project=\(self.username!)")
        config.fileURL!.appendPathExtension("realm")
        navigationController!.pushViewController(
            TasksViewController(realmConfiguration: config, title: "\(username!)'s Tasks"),
            animated: true
        )
        // :state-end: :state-uncomment-start: sync
        // print("Log in as user: \(username!)")
        // setLoading(true)
        //
        // app.login(credentials: Credentials.emailPassword(email: username!, password: password!)) { [weak self](result) in
        //     // Completion handlers are not necessarily called on the UI thread.
        //     // This call to DispatchQueue.main.async ensures that any changes to the UI,
        //     // namely disabling the loading indicator and navigating to the next page,
        //     // are handled on the UI thread:
        //     DispatchQueue.main.async {
        //         self!.setLoading(false)
        //         switch result {
        //         case .failure(let error):
        //             // Auth error: user already exists? Try logging in as that user.
        //             print("Login failed: \(error)")
        //             self!.errorLabel.text = "Login failed: \(error.localizedDescription)"
        //             return
        //         case .success(let user):
        //             print("Login succeeded!")
        //
        //             // Load again while we open the realm.
        //             self!.setLoading(true)
        //             // Get a configuration to open the synced realm.
        //             let configuration = user.configuration(partitionValue: "user=\(user.id)")
        //             // Open the realm asynchronously so that it downloads the remote copy before
        //             // opening the local copy.
        //             Realm.asyncOpen(configuration: configuration) { [weak self](result) in
        //                 DispatchQueue.main.async {
        //                     self!.setLoading(false)
        //                     switch result {
        //                     case .failure(let error):
        //                         fatalError("Failed to open realm: \(error)")
        //                     case .success:
        //                         // Go to the list of projects in the user object contained in the user realm.
        //                         self!.navigationController!.pushViewController(ProjectsViewController(userRealmConfiguration: configuration), animated: true)
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // :state-uncomment-end: :state-uncomment-start: start
        // // TODO: Replace the following code with code to launch the tasks view.
        // let alertController = UIAlertController(title: "TODO", message: "Implement sign-in functionality in WelcomeViewController.swift", preferredStyle: .alert)
        // alertController.addAction(UIAlertAction(title: "Ok", style: .default, handler: nil))
        // self.present(alertController, animated: true)
        // :state-uncomment-end:
    }
    // :code-block-end:
}
