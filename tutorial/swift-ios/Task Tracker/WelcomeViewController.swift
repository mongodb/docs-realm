//
//  WelcomeViewController.swift
//  Task Tracker
//
//  Created by MongoDB on 2020-04-30.
//  Copyright © 2020 MongoDB, Inc. All rights reserved.
//

import UIKit
import RealmSwift

// This flag is for tutorial-purposes only. It determines if the app should go the Projects
// list page after login or directly into the Tasks page for a placeholder project.
let USE_PROJECTS_PAGE = true

// The WelcomeViewController handles login and account creation.
class WelcomeViewController: UIViewController {
    let usernameField = UITextField()
    let passwordField = UITextField()
    let signInButton = UIButton(type: .roundedRect)
    let signUpButton = UIButton(type: .roundedRect)
    let errorLabel = UILabel()
    let activityIndicator = UIActivityIndicatorView(style: .medium)

    var username: String? {
        get {
            return usernameField.text
        }
    }

    var password: String? {
        get {
            return passwordField.text
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad();
        view.backgroundColor = .white

        // Create a view that will automatically lay out the other controls.
        let container = UIStackView();
        container.translatesAutoresizingMaskIntoConstraints = false
        container.axis = .vertical
        container.alignment = .fill
        container.spacing = 16.0;
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
            activityIndicator.centerXAnchor.constraint(equalTo: guide.centerXAnchor),
            ])

        // Add some text at the top of the view to explain what to do.
        let infoLabel = UILabel()
        infoLabel.numberOfLines = 0
        infoLabel.text = "Please enter a username and password."
        container.addArrangedSubview(infoLabel)

        // Configure the username and password text input fields.
        usernameField.placeholder = "Username"
        usernameField.borderStyle = .roundedRect
        usernameField.autocapitalizationType = .none
        usernameField.autocorrectionType = .no
        container.addArrangedSubview(usernameField)

        passwordField.placeholder = "Password"
        passwordField.isSecureTextEntry = true
        passwordField.borderStyle = .roundedRect
        container.addArrangedSubview(passwordField)

        // Configure the sign in and sign up buttons.
        signInButton.setTitle("Sign In", for: .normal);
        signInButton.addTarget(self, action: #selector(signIn), for: .touchUpInside)
        container.addArrangedSubview(signInButton)

        signUpButton.setTitle("Sign Up", for: .normal);
        signUpButton.addTarget(self, action: #selector(signUp), for: .touchUpInside)
        container.addArrangedSubview(signUpButton)

        // Error messages will be set on the errorLabel.
        errorLabel.numberOfLines = 0
        errorLabel.textColor = .red
        container.addArrangedSubview(errorLabel)
    }

    // Turn on or off the activity indicator.
    func setLoading(_ loading: Bool) {
        if loading {
            activityIndicator.startAnimating();
            errorLabel.text = "";
        } else {
            activityIndicator.stopAnimating();
        }
        usernameField.isEnabled = !loading
        passwordField.isEnabled = !loading
        signInButton.isEnabled = !loading
        signUpButton.isEnabled = !loading
    }

    @objc func signUp() {
        setLoading(true);
        app.usernamePasswordProviderClient().registerEmail(username!, password: password!, completion: { [weak self](error) in
            // Completion handlers are not necessarily called on the UI thread.
            // This call to DispatchQueue.main.sync ensures that any changes to the UI,
            // namely disabling the loading indicator and navigating to the next page,
            // are handled on the UI thread:
            DispatchQueue.main.sync {
                self!.setLoading(false);
                guard error == nil else {
                    print("Signup failed: \(error!)")
                    self!.errorLabel.text = "Signup failed: \(error!.localizedDescription)"
                    return
                }
                print("Signup successful!")

                // Registering just registers. Now we need to sign in, but we can reuse the existing username and password.
                self!.errorLabel.text = "Signup successful! Signing in..."
                self!.signIn()
            }
        })
    }

    @objc func signIn() {
        print("Log in as user: \(username!)");
        setLoading(true);

        app.login(withCredential: AppCredentials(username: username!, password: password!)) { [weak self](maybeUser, error) in
            // Completion handlers are not necessarily called on the UI thread.
            // This call to DispatchQueue.main.sync ensures that any changes to the UI,
            // namely disabling the loading indicator and navigating to the next page,
            // are handled on the UI thread:
            DispatchQueue.main.sync {
                self!.setLoading(false);
                guard error == nil else {
                    // Auth error: user already exists? Try logging in as that user.
                    print("Login failed: \(error!)");
                    self!.errorLabel.text = "Login failed: \(error!.localizedDescription)"
                    return
                }

                guard let user = maybeUser else {
                    fatalError("Invalid user object?")
                }

                print("Login succeeded!");

                self!.setLoading(true);

                // Configure the synced realm.
                var configuration = user.configuration(partitionValue: "user=\(user.identity!)")
                // Only allow User objects in this partition.
                // configuration.objectTypes = [User.self, Project.self] // doesn't work?
                // Open the realm asynchronously so that it downloads the remote copy before
                // opening the local copy.
                Realm.asyncOpen(configuration: configuration) { [weak self](userRealm, error) in
                    self!.setLoading(false);
                    guard error == nil else {
                        fatalError("Failed to open realm: \(error!)")
                    }

                    // For the second phase of the tutorial, go to the Projects management page.
                    // This is where you can manage permissions and collaborators.
                    self!.navigationController!.pushViewController(ProjectsViewController(userRealm: userRealm!), animated: true);
                }
            }
        };
    }
}

