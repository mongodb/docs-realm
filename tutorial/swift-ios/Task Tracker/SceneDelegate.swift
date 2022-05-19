//
//  SceneDelegate.swift
//  Task Tracker
//
//  Copyright © 2020-2022 MongoDB, Inc. All rights reserved.
//

import UIKit
import RealmSwift

// :snippet-start: initialize-app
let app = App(id: "tasktracker-qczfq") // :remove:
// :state-uncomment-start: sync
// let app = App(id: "<your-realm-app-ID-here>")
// :state-uncomment-end:
// :state-start: start local
// TODO: Declare a global Realm App instance.
// :state-end:
// :snippet-end:

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        // Use this method to optionally configure and attach the UIWindow `window` to the provided UIWindowScene `scene`.
        // If using a storyboard, the `window` property will automatically be initialized and attached to the scene.
        // This delegate does not imply the connecting scene or session are new (see `application:configurationForConnectingSceneSession` instead).

        guard let windowScene = (scene as? UIWindowScene) else { return }

        window = UIWindow(windowScene: windowScene)
        window?.makeKeyAndVisible()
        window?.rootViewController = UINavigationController(rootViewController: WelcomeViewController())
    }
}
