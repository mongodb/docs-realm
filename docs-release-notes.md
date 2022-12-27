# December 23, 2022

## Flutter SDK:

- Add App Services tab to the Flutter landing page
- Add "User Metadata" page to Flutter
- Remove download progress notification from Flutter docs
- Add info about connecting Using Android 7 or Older
- Added info clarifying "completed subscription state"
- Update minimum Flutter and Dart SDK versions

## C++ SDK:

- Add information about building an app with Android
- Add "Manage Email/Password Users" page

## .NET SDK:

- Change capitalization of "Linq" to "LINQ" in QuickStart
- Added info clarifying "completed subscription state"

## Kotlin SDK:

- Added info clarifying "completed subscription state"

## React Native SDK:

- Added info clarifying "completed subscription state"

## Swift SDK :

- Added info clarifying "completed subscription state"

## Other:

- Internal:
  - Add shared backend source for the unit test suite suites
  - C++ SDK:
    - Change capitalization convention for constant variables in authentication unit tests
  - Swift SDK:
    - Use Swiftlint to fix linting errors
  - .NET SDK:
    - Replace "Task" model with "Item" model in unit test suite

# December 16, 2022

## C++ SDK

- Model Data: New section containing the following pages w/tested code examples:
  - Object Types & Schemas
  - Supported Data Types
  - Relationships
- Connect to App Services: New page showing how to connect to an App Services app

## Flutter SDK

- Install Realm for Flutter: New "Update Package Version" section showing how to update Flutter SDK or Dart Standalone SDK in your project
- Manage Users/Custom User Data: New page with tested code example showing how to write custom user data from an Atlas Function
- Atlas App Services/Query Atlas GraphQL API: New page with tested code examples showing how to query & mutate data in MongoDB Atlas from the client app using the Atlas GraphQL API
- Sync Device Data:
  - Manage Subscriptions: Add more information about how subscriptions relate to the backend app/queryable fields/RQL, and how subscriptions are stored
  - Write Data to a Synced Realm: New page detailing more explicitly Sync subscription behavior and permissions and compensating writes
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## Java SDK

- Usage Examples/Sync Changes Between Devices: Add a note to the "Check Upload & Download Progress" section about Flexible Sync progress notifications only reporting a notification after changes are synced
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## Kotlin SDK

- Quick Start: Fix broken link
- Realm Database
  - Schemas/Supported Types
    - Add `MutableRealmInt`, `RealmList<T>`, `RealmSet<T>`, and `BacklinksDelegate<T>` to the list of supported types
    - Add note about importing `ObjectId` from `org.mongodb.kbson.ObjectId` in Realm Kotlin SDK version 1.5.x or higher
  - Open & Close a Realm: New "Open an In Memory Realm" section with tested code example showing how to open a realm in memory
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## .NET SDK

- Working with Unity: Typo fix
- Sync Data/Check Upload & Download Progress: Add a note about Flexible Sync progress notifications only reporting a notification after changes are synced
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## Node.js SDK

- Quick Start
  - Merge the local & sync quick starts into one quick start, with the optional step of Add Device Sync
  - Replace manual code examples with tested code examples generated with Bluehawk
- Usage Examples/Sync Changes Between Devices: Add a note to the "Check Upload & Download Progress" section about Flexible Sync progress notifications only reporting a notification after changes are synced
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## React Native SDK

- Quick Start
  - Merge the local & sync quick starts into one quick start, with the optional step of Add Device Sync
  - Replace manual code examples with tested code examples generated with Bluehawk
- Sync Data/Check Upload & Download Progress: Add a note about Flexible Sync progress notifications only reporting a notification after changes are synced
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## Swift SDK

- Sync Data/Check Upload & Download Progress: Add a note about Flexible Sync progress notifications only reporting a notification after changes are synced
- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## Web SDK

- SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it

## Other

- Landing Page: Add card for C++ SDK
- Realm SDK Telemetry: New page with information about the telemetry data that the Realm SDKs collect, and how to disable it
- Internal:
  - Created a new React Native unit test suite that is specific to React Native and uses components as well as `@realm/react`
    - Add tests & generate code snippets for the "Change an Object Model" page
  - Kotlin SDK
    - Fix bug in unit test suite
    - Switch to importing `ObjectId` from `org.mongodb.kbson.ObjectId`, change `ObjectId.create()` to `ObjectId()` in tests & generated code examples
  - Various Snyk and Dependabot upgrades and version bumps in example apps

# December 9, 2022

## C++ SDK

- Install Realm: New page with instructions for how to install the Realm C++ SDK using Swift Package Manager or CMake, remove "Install" instructions from landing page

## Flutter SDK

- Quick Start: Wording tweaks and typo fix
- Model Data/Define a Realm Object Schema: Typo fix
- Sync Device Data
  - Landing page: Add an explanation of what synced realms are, and how they differ from non-synced realms
  - Open Synced Realm: Further Reading: Add a link with some information about the new Manage Sync Subscriptions page
  - Manage Sync Sessions: Move content related to Flexible Sync subscriptions, focus on pause/resume, monitor upload/download progress, check network connection
  - Manage Sync Subscriptions: New page with existing content related to managing Flexible Sync subscriptions

## Java SDK

- Usage Examples/Sync Changes Between Devices: Typo fix

## Kotlin SDK

- Realm Database/Schemas: New "Realm Set" page with tested code examples showing how to use the `RealmSet()` data type

## .NET SDK

- Add content about Maui, tweak or remove content about Xamarin, from the following pages:
  - .NET SDK Landing Page
  - Install Realm
  - Realm Files
    - Bundle a Realm
    - Encrypt a Realm
  - Model Data/Define an Object Model
  - CRUD/Threading

## Node.js SDK

- Usage Examples/Authenticate Users: New section with a tested code example showing how to get a User Access Token

## React Native SDK

- Realm Database/Overview: Fix typos in a couple of links
- CRUD
  - Create: New tested code examples and content showing how to create objects using Realm React
  - Read: New tested code examples and content showing how to read objects using Realm React
- Manage Users/Authenticate Users: New section with a tested code example showing how to get a User Access Token

## Swift SDK

- Move "Manage User API Keys" page from "App Services" section to "Manage Users" section

## Web SDK

- Landing page: Fix broken link
- User Management/Authenticate Users: New section with a tested code example showing how to get a User Access Token

## Realm Studio

- Open a Realm File: Add tabs showing how to find the realm file path in the Flutter SDK & Kotlin SDK
- Modify Schema in Realm Studio: Add a tab for the Flutter SDK "Schema Versions & Migrations" page

## Other

- Remove a note about watching for collection notifications on serverless instances from Quick Starts, add it to Query MongoDB page
- Internal
  - Fix missing targets to address Snooty build errors and potentially fix broken links using those targets
  - Update the README for the C++ code example project with additional details & wording clarifications
  - Update the README for the Dart code example project to link to `realm-dart/main` instead of `realm-dart/master`
  - Add the contents of a now-archived external repository to this docs repository:
    - Realm SDK Reference Manual Landing Pages
    - CSVs & JSON containing reference info for Atlas App Services Public IPs & Realm Public IPs

# December 2, 2022

## C++ SDK

- Configure & Open a Realm: New page with tested code examples showing how to configure and open a realm

## Flutter SDK

- Install Realm for Flutter: Add a "Use Realm with the macOS App Sandbox" section with details about how to enable network requests while an app is in development
- Manage Realm Database Files
  - New section with landing page to organize content related to realm files
  - Move relevant pages into section: Configure & Open a Realm, Bundle a Realm, Compact a Realm, Encrypt a Realm
  - Delete a Realm: New page with a tested code example showing how to safely delete a realm
- User Management/Get an Access Token: New page with tested code examples showing how to get and refresh a user access token
- Sync Device Data/Add Sync to an App: New page showing the procedure & tested code examples for how to add Device Sync to an app
- Add the Dart/Flutter example projects repository to the navigation table of contents

## Kotlin SDK

- Quick Start: Fix a broken API reference doc link

## .NET SDK

- Quick Start
  - Update code examples to use `Task` model throughout, minor reorganization and removing outdated/unnecessary content
  - Minor copy/paste fixes
- CRUD/Filter and Sort Data: Add a new "Unsupported LINQ Operators" section listing LINQ operators that are not currently supported by the Realm .NET SDK
- Manage Users/Authenticate Users: Add a new "Get a User Access Token" section with an example function showing how to get a refreshed user access token
- Sync Data/Add Sync to an App: Fix a copy/paste artifact

## React Native SDK

- Install: Update "Prerequisites" to point to reactnative.dev docs, list a minimum required version, and link to the Compatability Chart in the realm-js repository
- Quick Start: Update "Prerequisites" to refer to the React Native SDK instead of the Node SDK
- Major Information Architecture refactor, including:
  - Move "Fundamentals" content onto relevant topic-based pages
  - Rearrange table of contents to present topic-based navigation instead of content-typed navigation
  - Split long pages (Define a Realm Object Model, Read & Write Data, Sync Changes Between Devices) into sections with smaller pages

## Swift SDK

- Realm Files/Configure & Open a Realm: Change a link to point to a more relevant section of the docs
- Model Data/Define an Object Model/Object Models: New "Remap a Property Name" section with a tested code example showing how to map a property name in your project to a different name - i.e. a snake-case Device Sync schema property name
- Manage Users/Authenticate Users: New "Get a User Access Token" section with tested code examples showing how to get and refresh a user access token

## Realm Studio

- Modify a Realm File: Add information about Realm Studio using the "Flatted" package, and how to parse it

## Other

- Add an `include` to be shared across docs about how to find an App ID, linking to the relevant page in App Services, and add this to all of the SDK Quick Starts
- Internal
  - Add a new checklist to the PR template
  - Add and update redirects from the .NET information architecture updates
  - Update dependencies in the readability GitHub workflow
  - Add a README.md to the C++ code example project explaining how to get set up, run the tests, and add examples
  - Change the C++ example project to use the Realm C++ SDK as a CMake/FetchContent dependency instead of a git submodule
  - Fix some broken external links causing Snooty build errors
  - Various Snyk upgrades and version bumps in example apps

# November 25, 2022

## Flutter SDK

- User Management: New landing page with high-level details about user management

## .NET SDK

- Major Information Architecture refactor, including:
  - Move "Fundamentals" content onto relevant topic-based pages
  - Rearrange table of contents to present topic-based navigation instead of content-typed navigation
  - Split long pages (Define an Object Model, Read & Write Data, Sync Changes Between Devices) into sections with smaller pages
  - Add new pages: Delete a Realm, Add Sync to an App

## Web SDK

- Install the Realm Web SDK: Update the CDN installation instructions to a base URL using a more recent version.
- Query MongoDB: Change `CLUSTER_NAME` to `DATA_SOURCE_NAME` in example

## Other

- Various Snyk and Dependabot upgrades and version bumps in example apps
- Typo fix in an include displayed across many pages

# November 18, 2022

## Flutter SDK

- Quick Start: Remove some content to match structure of other SDK quick starts
- Model Data: New section that organizes some pages from the top-level Flutter SDK navigation, adds a new top-level page with some concept information
  - Define a Realm Object Schema: Page moved from top level of Flutter SDK navigation, split some info out into smaller pages
  - Data Types: Page moved from top level of Flutter SDK navigation
  - Relationships: New page with existing content moved from Define a Realm Object Schema
  - Property Annotations: New page with existing content moved from Define a Realm Object Schema
  - Update a Realm Object Schema: Page moved from top level of Flutter SDK navigation
- Realm Database/Read & Write Data: New "Create Multiple Objects" section showing how to add multiple objects to a realm with the `Realm.addAll()` method
- Atlas App Services
  - Call a Function
    - Add the code for the App Services Function that the page calls in the example
    - Small updates to arguments when calling a function in `0.8.0+rc`
- Various pages
  - Update code examples to show using an `ObjectId` primary key
  - Update code examples to use `final` in variable declarations per preferred community practice

## React Native SDK

- Usage Examples/Debugging with Flipper: New page showing how to use the Flipper Debugger to debug Realm apps built with React Native

## Swift SDK

- Swift Concurrency: New page providing guidance about how to use Realm with Swift concurrency features
- SwiftUI
  - Write Data: New sections with code examples showing more complex write cases
  - Sync Data in the Background: New page showing how to use Apple's `.backgroundTask` to sync Realm data in the background
- Various pages: Refactor async code examples to show `@MainActor` where applicable

## Other

- Add several notes across all SDKs about:
  - Performance and storage implications of adding an Index
  - Advising developers using Sync to keep objects in memory until edits are complete to prevent excessive writes
  - Details about encrypting realms when using Sync or accessing encrypted realms from multiple processes

# November 11, 2022

## Flutter SDK

- Landing Page: Update "Beta" to "Release Candidate" or "RC" in landing page text and navigation
- Realm Database
  - Define a Realm Object Schema
    - Add supported data types to the "Indexed" section
    - New "Inverse Relationship" section with tested code example and details about backlinks
  - Data Types: Add `parent` property to Embedded Objects docs & code example
  - Compact a Realm: Update docs with details & tested code example for the `Realm.compact()` static method
- Sync Device Data
  - Manage a Sync Session: New section with tested code example showing how to remove all subscriptions to objects of a specific type
  - Handle Sync Errors: New Client Reset section with documentation & code examples for client reset with recovery
- Atlas App Services
  - Update landing page with a new section about calling Atlas functions
  - Call a Function: New page with tested code example for calling Atlas Functions from Flutter SDK

## Kotlin SDK

- Update Realm Kotlin version to 1.4.0
- Realm Database/Schemas/Index a Field: Add `RealmUUID` to supported indexable data types

## .NET SDK

- Install Realm for .NET: Remove an outdated note related to old versions
- Usage Examples/Sync Changes Between Devices: New "Cancel a Sync Session" section with details and code example showing how to use a CancellationToken

## Node.js SDK

- Usage Examples
  - Reset a Client Realm: Update documentation & code examples for client reset with recovery
  - Call a Function: Replace deprecated api key methods
  - Authenticate Users: Replace deprecated api key methods

## React Native SDK

- Usage Examples
  - Define a Realm Object Schema: Add `UUID` to supported indexable data types
  - Reset a Client Realm: Update documentation & code examples for client reset with recovery
  - Call a Function: Replace deprecated api key methods

## Swift SDK

- Install: Update the Carthage installation instructions to use xcframeworks
- SwiftUI/Quick Start: Remove Partition-Based Sync from Quick Start, update login/logout to async/await syntax
- Various pages: Update code examples to change "Task" object naming that conflicts with Swift `Task` keyword

## Web SDK

- User Management/Authenticate Users
  - Replace deprecated api key methods
  - Fix a typo

## Other

- Realm Docs Landing Page: Move Java SDK card to "below the fold", update language around Realm Database
- Remove unused files

# November 4, 2022

## Flutter SDK

- Realm Database
  - Open & Close a Realm: New subsection mentioning compacting a realm and linking to the new Compact a Realm page
  - Compact a Realm: New page with general info about compacting a realm & a code example showing the `shouldCompactCallback()` usage

## Kotlin SDK

- Install/Kotlin Multiplatform: Point to the correct Realm Kotlin dependency when used across Gradle Modules
- Sync/Open a Synced Realm: Switch the order of the Partition-Based Sync and Flexible Sync tabs to show Flexible Sync first
- Atlas App Services/Link User Identities: New page with tested code example showing how to link credentials

## .NET SDK

- Quick Start: Integrate Quick Start & Quick Start with Sync into one Quick Start, update for Flexible Sync
- Fundamentals
  - Write Transactions: Add info about `cancellationToken`
  - Atlas Device Sync: Add new section about Unidirectional Sync with link to new Unidirectional Sync page
  - Unidirectional Data Sync: New page with details and tested code example for how to use Asymmetric Sync

## React Native SDK

- Use Realm React: Add a note about version requirements for using Realm React with Realm JS Version 11

## Web SDK

- Apollo GraphQL Client (React): Update the method name and add details around refreshing the access token

## Other

- Realm Query Language: Remove `IN` operator from unsupported Flexible Sync operators; add details around using `IN` with Flexible Sync

# October 28, 2022

## Tutorials

- Removed section. Moved tutorials to Atlas App Services at: https://www.mongodb.com/docs/atlas/app-services/get-started/

## Flutter SDK

- Realm Database
  - Define a Realm Object Schema: Update Embedded Object support with details & link to Data Types page
  - Read & Write Data: New "Background Writes" section with details & tested code example for `writeAsync`
  - Data Types: New "Embedded Objects" section with details & tested code examples
- Sync Device Data/Open Synced Realm: New "Open a Realm After Downloading Changes" with async open details & tested code examples
- Various pages: Change styling of cross-links from "Tip" callout boxes to regular text links

## Java SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info

## .NET SDK

- Advanced Guides/Client Resets: Update client reset handler documentation for Client Recovery, with new tested code examples

## React Native SDK

- Install Realm for React Native: Add an optional step to React Native v.60+ install tab about enabling Hermes

## Swift SDK

- CRUD/Threading: Update the code example for using `@ThreadSafe` wrapper on a function parameter to show correct `@MainActor` usage
- Test Suite: Fix a failing test related to upgrading to Xcode 14.x

## Other

- Introduction: Remove tutorials from "Get Started" section, add links to SDK landing pages
- All SDK landing pages: Small tweaks to new styling & images to improve consistency
- Various Snyk dependency version updates

# October 21, 2022

## Flutter SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info
- Realm Database/Freeze Data: New page documenting the ability to freeze objects in the Flutter SDK, with tested code examples
- Various pages: Minor tweaks incorporating review feedback across several pages

## Node.js SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info

## React Native SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info

## Swift SDK

- Why Realm Database?: Add mention of sectioned results to "Live Queries"
- Model Data/Define an Object Model/Supported Types: Add details around SectionedResults/ResultsSection
- CRUD/Read: New "Section Query Results" section with details and tested code examples
- SwiftUI
  - React to Changes: New "Observe Sectioned Results" subsection with details and tested code examples for `@ObservedSectionedResults`
  - Filter Data: New "Section Filtered Results" section with details and tested code example for `@ObservedSectionedResults`
- Sync Data/Handle Sync Errors: Add documentation & code examples for client reset with recovery

# October 14, 2022

## Flutter SDK

- Realm Database

  - Data Types: Added that nullable types in lists are supported.
  - Define a Realm Object Schema: Added that primary keys are nullable
  - Read & Write Data: Added section on how to upsert an object using Realm.add()
  - Encrypt a Realm: Added documentation on encrypting a realm
  - Update a Realm Object Schema: Created this new page to add details on manual migration using the migrationCallback configuration
  - Open & Close a Realm: Added note about new 'Update a Realm Object Schema' page.

- User Management
  - Authenticate Users: Note about breaking change to email/password authentication when an app uses a version greater than 0.5.0. User will need to reset password or create a new account.
  - Authenticate Users: Documented API key user authentication

## C++ SDK

- Maintenance to landing page wording
- Added note about update for C++17 support

## Kotlin SDK

- Updated the landing page to create better getting started flow

## React Native SDK

- Define a Realm Object to Schema: Documented Asymetric Sync support in new section, 'Define an Asymmetric Object'.

## Web SDK

- Quick Start with React: Clarified name of the quick start from 'Realm - React Quick Start' to 'Quick Start with React'

## Other

- Added contribution guide to the documentation repository
- Realm Query Language: Added section on backlink query syntax
- Removed .. default-domain:: mongodb directive from the docs
- Updated Jest to version ^29.0.0 and realm to ^10.21.0

# October 7, 2022

## Flutter SDK

- Realm Database
  - Define a Realm Object Schema: Add details for how to declare Realm models across multiple files (public vs. private)
  - Bundle a Realm: New page with procedure and tested code examples showing how to bundle a Realm in a Flutter app
- Sync Device Data
  - Open Synced Realm: Add link to new Handle Sync Errors page, clarify details about opening a Flexible Sync realm
  - Handle Sync Errors: New page with info and code example showing how to handle sync errors

## Kotlin SDK

- Quick Start
  - Grammar and typo fixes
  - Change `user.identity` to `user.id`
- Realm Database/Schemas/UUID: New page with info & tested code example showing how to generate a `RealmUUID`
- Atlas App Services
  - Register Users: Change `user.identity` to `user.id`
  - Authenticate Users: Add details & code example to Anonymous documentation showing how to reuse an anonymous user
  - Delete Users: New page with info and tested code example showing how to delete users
- Bump Kotlin SDK version used in docs

## .NET SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info

## Swift SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info

## Web SDK

- Landing Page: Redesign the landing page with new styling, tabbed use cases and better getting started info
- Move the Next.js Integration Guide to a more prominent position in the table of contents

# September 30, 2022

## Web SDK

- Next.js Integration Guide: New page with code examples showing how devs can use Next.js with the Realm Web SDK

# September 23, 2022

## Tutorials

- Fix the return character in the CLI create template app command in Xamarin, Flutter, Kotlin and SwiftUI tutorials

## Flutter SDK

- Realm Database/Data Types: New `DateTime` subsection with information and code example

## Node.js SDK

- Usage Examples/Query Data: Add tested code example for constructing a query

## React Native SDK

- Usage Examples/Query Data: Add tested code example for constructing a query

## Swift SDK

- Model Data/Define an Object Model: New "Define an Asymmetric Object" section
- CRUD/Create: New "Create an Asymmetric Object" section
- Sync Data
  - Configure & Open a Synced Realm: Update note to specify not to use subscriptions with Asymmetric Sync
  - Flexible Sync: Add a note that Asymmetric Sync does not require a subscription
  - Stream Data to Atlas: New page with code examples about how to use Asymmetric Sync in the Swift SDK

## Other

- Realm Query Language: New "Nil Type" section

# September 16, 2022

## Flutter SDK

- Realm Database/Data Types: Remove outdated information about supported data types

## Kotlin SDK

- Fix broken links to API reference docs across various pages

## .NET SDK

- Install: General updates including updating screenshots, adding wording about installing the SDK for all projects, removing deprecated information
- Usage Examples/Modify an Object Schema: Typo fix

## React Native SDK

- Test & Debug: "Clean Up Tests": add suggestion and updated code example showing Jest's built-in `beforeEach()`
  and `afterEach()` hooks when testing

## Swift SDK

- Simplify the Quick Starts section, including:
  - Consolidate local and Sync Quick Starts into a single quick start for both local and Sync
  - Update Quick Start Sync details to show Flexible Sync
  - Move Xcode Playgrounds page to a top-level navigation item for Swift SDK
  - Remove the "Quick Starts" directory and instead point to the single consolidated quick start page
- SwifUI/Quick Start: Fix broken link to API reference doc
- Add a new Tip alongside async/await code examples to access Realm on the `@MainActor` to avoid threading-related crashes
- Update the iOS unit test suite for Xcode 14

## Other

- Set up a GitHub Workflow to run Dart unit tests for Flutter SDK code examples
- Update the iOS GitHub Workflow for Xcode 14

# September 9, 2022

## Tutorials

- Create new tutorials based on Template Apps using Flexible Sync for:
  - iOS with SwiftUI
  - Android with Kotlin
  - Xamarin (iOS and Android) with C#
  - React Native with JavaScript
  - Flutter with Dart
- Remove old Partition-Based Sync tutorials based on the clone-and-go backend

## C++ SDK

- New C++ section consisting of:
  - Landing page with installation instructions and usage examples
  - Generated API Reference using Doxygen
  - Link to the GitHub repository

## Flutter SDK

- Quick Start: Add new section with tested code example for adding Device Sync (Flexible Sync) to an app
- Install Realm: Add note about incompatibility with Dart 2.17.3
- Realm Database/Define a Realm Object Schema: Update supported primary key types to include `ObjectId` and `Uuid`

## .NET SDK

- Fundamentals/Data Binding: Formatting and grammar improvements

## Other

- Realm Query Language: New section with info and tested code examples for List comparisons
- Landing page: Fix broken link to Realm Introduction
- Replace smart quotes with mono quotes across several pages

# September 1, 2022

## Flutter SDK

- Open & Close a Realm: New section with tested code example for customizing the default configuration
- Sync Device Data/Sync Multiple Processes: New page showing how to use Realm with Sync from multiple processes

## Kotlin SDK

- Quick Start: Add new sections with tested code examples for:
  - Watch for Changes
  - Close a Realm
  - Adding Device Sync (Flexible Sync) to an app
- Sync/Subscribe to Queryable Fields: Styling bug fix in a section header

## .NET SDK

- Fundamentals/Data Binding: New page with tested code examples showing common data binding scenarios
- Advanced Guides/Convert Between Non-Synced Realms and Synced Realms: New page with tested code examples for using the WriteCopy API to copy Realms for different configurations

## Swift SDK

- Landing page: Add section with a SwiftUI example and link to SwiftUI docs
- SwiftUI Landing Page: Add link to template apps
- Move SwiftUI Quick Start to SwiftUI section

## Web SDK

- Re-organize the Web SDK table of contents to present a more task-based information architecture
- User Management: New page with information about managing users
- Atlas App Services: Add summaries of App Services features, with links to related documentation

## Other

- Improvements for the Readability GitHub workflow

# August 26, 2022

## Flutter SDK

- User Management/Authenticate Users
  - Add an example for multiple anonymous users
  - Add new auth provider documentation for Custom JWT, Custom Function, Facebook, Google, Apple

## Kotlin SDK

- Sync/Subscribe to Queryable Fields: Bug fix in the Update Subscription example

## Swift SDK

- Update deprecated RLM_ARRAY_TYPE to RLM_COLLECTION_TYPE macro in a few Objective-C code examples
- Convert SwiftUI docs page into a new SwiftUI docs section w/tested View code examples
- Update the iOS Test Suite README with information about creating & running the new SwiftUI tests

## Other

- Product naming updates across many pages to improve first/subsequent naming compliance and other naming issues
- General maintenance including: fix broken links, remove deprecated files, update CI

# August 19, 2022

## Flutter SDK

- User Management/Delete a User: New page documenting deleting users, with tested code example

## Swift SDK

- React to Changes: New "Notification Delivery" section describing notification delivery guarantees

## Other

- Java SDK & Kotlin SDK: Improved Gradle documentation and dependency management across example projects
- Various Snyk upgrades and version bumps in example apps

# August 12, 2022

## Node.js SDK

- Landing page: Bug fix in "Update Live Objects" code example

## Other

- Realm docs landing page: Update Hero image
- Various Snyk upgrades and version bumps in example apps

# August 5, 2022

## .NET SDK

- Usage Examples/React to Changes: Add a new section with tested code examples for "Check if the Collection Has Been Cleared"

## Node.js SDK

- Usage Examples
  - Open & Close a Realm: Add a note about `WriteCopy` only supporting Partition-Based Sync
  - Flexible Sync: Remove `reRunOnOpen` API from docs

## React Native SDK

- Usage Examples
  - Open & Close a Realm: Add a note about `WriteCopy` only supporting Partition-Based Sync
  - Flexible Sync: Remove `reRunOnOpen` API from docs

## Swift SDK

- Sync Data/Configure & Open a Synced Realm: Add a note about `writeCopy` only supporting Partition-Based Sync
- Code examples and docs updated across 10 pages related to Swift SDK IA updates (CRUD operations, data modeling, and Add Device Sync to an App)

# July 29, 2022

## .NET SDK

- Advanced Guides/Client Resets: Update client reset handler docs to reflect `DiscardLocalResetHandler` as default

## Node.js SDK

- Advanced Guides/Access Custom User Data: Update code block formatting to fix syntax highlighting

## Swift SDK

- Install: Typo fix
- Model Data/Model Data with Device Sync: Add section describing how to generate object models from schemas & vice versa
- React to Changes: Note collection change listener example does not support high-frequency updates

## Web SDK

- Install: New page with instructions to install the Web SDK

## Realm Studio

- Open a Realm File: Add an "Error Opening Realm File" section re: realm file version mismatch errors

## Other

- Realm Query Language: Add documentation for additional operators: type, dictionary, and date. Page formatting updates.
- Add Readability check to post readability scores on docs PRs

# July 22, 2022

## Java SDK

- Bump Java SDK version to 10.11.1

## Kotlin SDK

- React to Changes: New page with tested code examples for registering & unsubscribing change listeners

## Node.js SDK

- Fundamentals/Relationships & Embedded Objects: Add code example and docs for dynamically obtaining an inverse linked object

## React Native SDK

- Fundamentals/Relationships & Embedded Objects: Add code example and docs for dynamically obtaining an inverse linked object

## Other

- Various Snyk upgrades and version bumps in example apps
- Various dependabot version bumps in example apps
- Remove admonitions, switch to appropriate admonition types, clean up terms and source constants across all docs pages
- Switch all YAML step files to use new rST procedure directive

# July 15, 2022

## Flutter SDK

- App Services Overview: Add CTA button to "Create an App Services Account"
- Add ObjectID to Flutter RQL example

## Java SDK

- Landing Page: Add CTA button to "Create an Account"
- Fundamentals/Query Engine: Clarify language around RQL, add cross-links
- Usage Examples/Filter Data: Clarify language around RQL

## Kotlin SDK

- Landing Page: Add CTA button to "Create an Account"
- Realm Database/Schemas/Relationships: Update to-many relationship code example from `List` to `RealmList`
- Realm Database/Read/Filter Data: new page w/code example & link to RQL reference
- Update code example README and fix some tests that hang infinitely

## .NET SDK

- Landing Page: Add CTA button to "Create an Account"
- Fundamentals/Query Engine: Minor updates in line with RQL docs updates, removed aggregate operator reference & linked to RQL reference instead
- Fix typo in code examples

## Node.js SDK

- Landing Page: Add CTA button to "Create an Account"
- Usage Examples/Query Data: Move "Query Engine" from Advanced Guides to Usage Examples, refactor based on RQL docs updates

## React Native SDK

- Landing Page: Add CTA button to "Create an Account"
- Usage Examples/Query Data: Move "Query Engine" from Advanced Guides to Usage Examples, refactor based on RQL docs updates

## Swift SDK

- Landing Page: Add CTA button to "Create an Account"
- Install: Update instructions to remove fixed release version & instead link to SDK releases page
- Major Information Architecture refactor, including:
  - Move "Fundamentals" content onto relevant topic-based pages
  - Rearrange table of contents to present topic-based navigation instead of content-typed navigation
  - Split long pages (Define an Object Model, Read & Write Data, Sync Data Between Devices) into sections with smaller pages
  - Add new pages: Delete a Realm, Model Data with Device Sync, Add Sync to an App

## Web SDK

- Landing Page: Add CTA button to "Create an Account"

## Other

- Introduction to Realm
  - Update naming for product brand guidelines
  - Copy edits to reflect current state App Services
  - Update SDK references
- Realm Query Language
  - Added arithmatic operator section to page
  - Added parameterized queries section to page
  - Moved up the example section for clarity
  - Removed flex sync note from the top of the page
  - Clarified usage of BETWEEN operator
  - Moved the RQL page up a level in the IA
- Various Snyk upgrades and version bumps in example apps

# July 8, 2022

## Flutter SDK

- Sync Device Data/Manage Sync Session: Add Flexible Sync Limitations/unsupported RQL operators directly to page

## Java SDK

- Cleanup, standardize, and remove unnecessary callouts
- Usage Examples/Flexible Sync: Add Flexible Sync Limitations/unsupported RQL operators directly to page

## Kotlin SDK

- Cleanup, standardize, and remove unnecessary callouts
- Usage Examples/Flexible Sync: Add Flexible Sync Limitations/unsupported RQL operators directly to page
- Update Kotlin SDK to 1.0.1

## .NET SDK

- Usage Examples/Flexible Sync: Add Flexible Sync Limitations/unsupported RQL operators directly to page

## Node.js SDK

- Usage Examples/Flexible Sync: Add Flexible Sync Limitations/unsupported RQL operators directly to page

## React Native SDK

- Usage Examples/Flexible Sync: Add Flexible Sync Limitations/unsupported RQL operators directly to page

## Swift SDK

- Usage Examples/Flexible Sync: Add Flexible Sync Limitations/unsupported RQL operators directly to page

## Reference

- Realm Query Language: Document querying ObjectID & UUID

## Misc

- Update some Node.js/Web code examples based on feedback

# July 1, 2022

## Kotlin SDK

- Handle Errors: New Section w/overview of types of errors
  - Realm Errors: New Page w/tested code examples and guidance around error handling
  - App Errors: New page w/tested code examples and guidance around error handling

## Node.js SDK

- Usage Examples/Query MongoDB: Add Aggregation Operations w/tested code examples

## React Native SDK

- Install: Add note about Expo v45 not supported on Android.
- Usage Examples/Query MongoDB: Add Aggregation Operations w/tested code examples

## Swift SDK

- Landing Page & Install: Update Apple deployment targets and minimum Xcode version
- Usage Examples/Flexible Sync: Add note about Combine support for Flexible Sync
- Usage Examples/SwiftUI Guide
  - Open a Realm with a Configuration: Clarify using SwiftUI w/configurations based on docs feedback
  - Use Realm w/SwiftUI Previews: New section w/guidance & tested code examples

## Web SDK

- Atlas App Services/MongoDB Data Access: Add Aggregation Operations w/tested code examples

## Misc

- Add redirects for App Services/Reference content

# June 24, 2022

## .NET SDK

- Add "Work with Users" section, move authentication-related pages from Usage Examples and Advanced Guides into this section
  - Add information & code examples for deleting a user and deleting the user's Custom User Data
  - Add information & code examples for reading user metadata

## Node.js SDK

- Usage Examples/Flexible Sync: Add docs & code examples for initial subscriptions & reRunOnStartup

## React Native SDK

- Usage Examples/Flexible Sync: Add docs & code examples for initial subscriptions & reRunOnStartup

## Swift SDK

- Event Library: New page w/SDK implementation details for the Event Library

# June 17, 2022

## Tutorial

- Task Tracker (Web): Remove unnecessary dependencies that conflict with Create React App base config

## Flutter SDK

- Sync Device Data/Manage Sync Session: Update docs on behavior of updating a Flex Sync subscription, update tested code examples

## Kotlin SDK

- App Services/Authenticate Users: Link to related docs for auth examples on other platforms

## .NET SDK

- Usage Examples/Flexible Sync: Add info & code for bootstrapping realm with initial subscription

## Swift SDK

- Usage Examples
  - SwiftUI Guide: Clarify SwiftUI migration details based on user feedback
  - Flexible Sync: Update `rerunOnOpen` example to show re-computing vars
- Unit Tests: Add delays to Sync tests to fix failures
- Generate new code examples for updates renaming Realm App to App Services

## Reference

- Restore section after App Services docs split w/links to Glossary & Realm Query Language pages

# June 10, 2022

As the documentation is now split into separate repositories, and "App Services" is officially no longer directly associated with Realm Database SDKs, we're moving App Services release notes to the [App Services repository](https://github.com/mongodb/docs-app-services).

## Flutter SDK

- Realm Database
  - Define a Realm Object Schema: new sections for modifying realm schema, using schemas with Device Sync
  - Read & Write Data: Add info about being able to return from write transactions
  - Data Types: Add UUID & ObjectId data types
  - Database Internals: New page w/moved & new content describing details about how realm works
- App Services: new page describing SDK-related App Services for Flutter devs
- Connect to App Services backend: new page w/info & tested code examples
- User Management: new section
  - Authenticate Users: new page w/authentication overview info + examples
  - Email/Password Users: new page w/info & tested code examples
  - Work with Multiple Users: new page w/info & tested code examples
  - Link User Identities: new page w/info & tested code examples
  - Custom User Data: new page w/info & tested code examples
- Sync: New page w/overview info
  - Manage Sync Session: new page w/info & tested code examples
  - Open Synced Realm: new page w/info & tested code examples

## Kotlin SDK

- Update many pages for the Kotlin 1.0 release/GA
  - Generate updated code examples
  - Add links to API reference after 1.0 release/API published
- Sync
  - Overview: Add Flexible Sync info & tested code example
  - Open a Synced Realm: Add Flexible Sync info & tested code examples
  - Subscribe to Queryable Fields: new page w/Flexible Sync info & tested code examples
- App Services
  - Authenticate Users: add tested code examples for all the authentication methods the Kotlin SDK supports

## Java SDK

- Usage Examples/Flexible Sync: Remove note about Flexible Sync being in Preview

## .NET SDK

- Usage Examples
  - Sync Changes Between Devices: Update API reference link
  - Flexible Sync: Remove note about Flexible Sync being in Preview
- Advanced Guides/Client Resets: Add links to API reference

## Node.js SDK

- Usage Examples
  - Define a Realm Object Schema: new section for Define an Asymmetric object
  - Flexible Sync: remove note about Flexible Sync being in Preview

## React Native SDK

- Use Realm React
  - Code cleanup & updates to the `@realm/react` examples application + generate updated code examples
  - Add a new section about using the `AppProvider`/new Sync hooks
- Usage Examples/Flexible Sync: remove note about Flexible Sync being in Preview

## Swift SDK

- Quick Starts/SwiftUI Quick Start: Add Flexible Sync to the SwiftUI quick start
- Usage Examples
  - Flexible Sync
    - Update the docs & code examples for breaking API changes
    - Add ability to query all objects of a type
    - Add `initialSubscriptions` and `rerunOnOpen` examples
    - Remove note about Flexible Sync being in Preview
  - SwiftUI Guide: Update the "Open a Synced Realm" section w/Flexible Sync property wrappers

Many pages/Misc.

- Rename MongoDB Realm -> App Services
- Update title lines to fix Snooty build complaints
- Bump dependencies in tutorials

# May 27, 2022

## SDK Docs

Various changes related to separating App Services & SDK docs:

- Move SDKs up one level so each SDK is now an entry in the main ToC
- Remove Get Started section
- Move "Intro for Mobile Developers" to top-level ToC and call it "Introduction"
- Remove App Services-related tutorials (moved to App Services docs)
- Move Unity tutorial to .NET SDK docs to unify "Tutorials" to be only the Task Tracker tutorial
- Remove Release Notes from ToC; App Services now has Cloud-side release notes, and each SDK has its own release notes

### Java SDK

- Update generated API reference docs to fix incorrectly-rendered links related to characters that need to be escaped
- Update Java SDK version in unit tests

### Swift SDK

- Install: Add missing dependency to Static Framework install instructions

## MongoDB Cloud Docs

Various changes related to separating App Services & SDK docs:

- Landing page: Update cards w/App Services-relevant info
- Introduction: New page. Moved & consolidated from docs-realm Intro for Backend Developers/Intro for Web Developers
- Template Apps: Move page from Manage & Deploy Realm apps/Create to top-level nav
- Tutorials: New section w/App Services-relevant tutorials moved from docs-realm
- Realm SDKs: Add ToC link to Realm SDKs

### Realm Sync

- Realm Sync/What is Realm Sync/Realm Sync Overview: Remove "Preview" from Kotlin/Flutter SDK link descriptions

### Users & Authentication

- Users & Authentication: Fix incorrect refresh token length, add clarifications

### GraphQL API

- GraphQL API: Add note about mutations and custom resolvers using transactions
- GraphQL Types, Resolvers, and Operators
  - Add FindMany limit
  - Clarify that GraphQL represents undefined as an empty object
  - Note that GraphQL RelationInput cannot simultaneously create and link

### Reference

- Authenticate HTTP Client Requests: Fix incorrect refresh token length, add clarifications

Realm Admin API

- Add info to configure resume operation with `disable_token`
- Add Rules endpoint info for working with a linked data source:
  - Get all rules: GET /services/{DataSourceID}/rules
  - Create a rule: POST /services/{DataSourceID}/rules
  - Get a rule: GET /services/{DataSourceID}/rules/{RuleID}
  - Update a rule: PUT /services/{DataSourceID}/rules/{RuleID}
  - Delete a rule: DELETE /services/{DataSourceID}/rules/{RuleID}

# May 20, 2022

## SDK Docs

### Java SDK

- Usage Examples/Authenticate Users: Add "Offline Login" example

### Swift SDK

- Usage Examples/Read & Write Data: Add a new section "Perform a Background Write" that covers Swift async writes
- Advanced Guides/Threading: Add a "see also" to the page pointing to the new async write documentation
- Examples/README.md: Update with info about running the unit tests with SPM

### .NET SDK

- Advanced Guides/Client Reset: Update code examples for discard local client reset

### Node.js SDK

- Read & Write Data: Rephrase language around JS bulk update for accuracy

### React Native SDK

- Read & Write Data: Rephrase language around JS bulk update for accuracy

### Various Infrastructure Updates

- Remove MongoDB Cloud docs from docs-realm repository, add redirects
- Update unit tests to prepare for Bluehawk 1.0 release

## MongoDB Cloud Docs

### Manage & Deploy Realm Apps

- Deploy Manually/Roll Back Deployments: Add note that rolling back does not re-deploy hosted files

### Realm Sync

- Handle Errors/Sync Errors: Separate the information on handling sync errors and setting the client log level

### MongoDB Data Sources

- MongoDB Data Sources: Add information about limited Atlas Serverless support

### Users & Authentication

- Authentication: Add refresh token expiration after 30 days
- Authentication Providers/API Key Authentication: Add server API key limit

### HTTPS Endpoints

- HTTPS Endpoints: Add a new Return Types section

### Functions

- Functions: Consolidate procedures from Call a Function, Define a Function, update examples & refresh page

### Reference

- Authenticate HTTP Client Requests: Add refresh token expiration after 30 days
- Realm Admin API: Add GraphQL Endpoints
  - Run a query or mutation
  - Get custom resolvers
  - Create a custom resolver
  - Get a custom resolver
  - Modify a custom resolver
  - Delete a custom resolver
  - Get validation settings
  - Modify validation settings

# May 12, 2022

## SDK Docs

### Swift SDK

- Test and Debug: Add section to help diagnose and debug schema discovery errors

### Node.js SDK

- Quick Start: Typo fix

Usage Examples

- Reset a Client Realm: Fix incorrect syntax in client reset code examples
- Open and Close a Realm: Add "open a realm offline" examples
- Authenticate Users: Add "offline login" example

### React Native SDK

Usage Examples

- Reset a Client Realm
  - Fix title case in section title
  - Fix incorrect syntax in client reset code examples
- Open and Close a Realm: Add "open a realm offline" examples
- Authenticate Users: Add "offline login" example

## MongoDB Cloud Docs

MongoDB Data Access -> Rename to MongoDB Data Sources

- Move the content from the _Link a Data Source_ page onto _MongoDB Data Sources_ page
- Rearrange ToC so this section now includes the following pages:
  - CRUD & Aggregation APIs
  - Read Preference
  - Wire Protocol
  - Document Preimages
  - Internal Database Usage
- Various updates across pages within the section

Starting Wednesday, May 11, there was a publishing freeze on MongoDB Cloud Docs.
This is a temporary freeze while we do some infrastructure adjustments; we hope
to be publishing to these docs again next week.

# May 6, 2022

## SDK Docs

### Java SDK

Usage Examples

- Define a Realm Object Schema: Add info about relationship limitations, link to UI to create relationships
- Call a Function: Add callout reminding devs to sanitize client data to protect against code injection

### Swift SDK

Usage Examples

- Define a Realm Object Schema: Add info about relationship limitations, link to UI to create relationships
- Call a Function: Add callout reminding devs to sanitize client data to protect against code injection

### .Net SDK

Usage Examples

- Define a Realm Object Schema: Add info about relationship limitations, link to UI to create relationships
- Call a Function: Add callout reminding devs to sanitize client data to protect against code injection
- Sync Changes Between Devices: Add new section about checking Connection State, related updates

### Node.js SDK

Usage Examples

- Open and Close a Realm: Clarify behavior if you write a copied realm to a realm file that already exists
- Reset a Client Realm: Add documentation for the Discard Unsynced Changes client reset strategy
- Define a Realm Object Schema: Add info about relationship limitations, link to UI to create relationships
- Call a Function: Add callout reminding devs to sanitize client data to protect against code injection

Advanced Guides

- Manual Client Reset Data Recovery: New page showing how to manually recover unsynced changes after a client reset
- Multi-User Applications: Fix a code example include pointing at the wrong code snippet

### React Native SDK

Usage Examples

- Open and Close a Realm: Clarify behavior if you write a copied realm to a realm file that already exists
- Reset a Client Realm: Add documentation for the Discard Unsynced Changes client reset strategy
- Define a Realm Object Schema: Add info about relationship limitations, link to UI to create relationships
- Call a Function: Add callout reminding devs to sanitize client data to protect against code injection

Advanced Guides

- Manual Client Reset Data Recovery: New page showing how to manually recover unsynced changes after a client reset
- Multi-User Applications: Fix a code example include pointing at the wrong code snippet

### Kotlin SDK

Realm Database

- Serialization: New page on using serialization methods from libraries that depend on reflection
- Schemas
  - New pages for:
    - Ignore a Field
    - Index a Field
    - Optional Fields
    - Primary Keys
    - Relationships
    - Timestamps
  - Supported Types: Update supported types
- Update/Update a Collection: New page about how to update a collection

### Flutter SDK

- Realm Database/Define a Realm Object Schema: Add info about relationship limitations, link to UI to create relationships

## MongoDB Cloud Docs

Realm Sync

- Configure and Update Your Data Model/Enable or Disable Development Mode: Add note about user needing write access to data in order to use Dev Mode to update schema
- Data Access Patterns/Flexible Sync: Update eligible field types to clarify array support

Schemas

- Relationships: Add info about relationship limitations
- Remove a Schema: New page with procedure to remove a schema

Rules

- Configure Advanced Rules: Add link to relationship configuration reference

GraphQL API

- GraphQL Overview: Clarify how Realm GraphQL uses a code-first approach, add limitations

Functions

- Call a Function: Add callout reminding devs to sanitize client data to protect against code injection
- Query MongoDB Atlas
  - Write: New page combining Insert, Update, Delete, Transactions, and Bulk Writes
  - MongoDB API Reference: Move & combine content from old location (MongoDB Actions)

Triggers

- Database Triggers: Add note about Project Expressions being inclusive only

Static Hosting

- Enable Hosting: Remove CLI from static hosting page as you can't currently use it w/static hosting

Reference

- Realm Admin API: Add API endpoints to get and update Realm Hosting config
- Realm Query Language: Remove `IN` and collection operators from unsupported Flexible Sync operators

- Remove legacy links from sidebars for SEO purposes

## Various Dependency Updates

- Bump async from 2.6.3 to 2.6.4
- Bump cross-fetch from 3.1.4 to 3.1.5
- Bump ejs from 3.1.6 to 3.1.7

# April 29, 2022

## SDK Docs

### .Net SDK

Usage Examples

- Open a Realm: Make `FlexibleSyncConfiguration` a link to API docs
- Authenticate Users: Add section about "Offline Login"

### Node.js SDK

- Usage Examples -> Open and Close a Realm: Add documentation for opening local realm as synced and synced realm as local
- Fix broken JS/TS tests

### React Native SDK

- Usage Examples -> Open and Close a Realm: Add documentation for opening local realm as synced and synced realm as local

### Flutter SDK

- Move Flutter SDK pages about Realm Database to a new Realm Database section

### Web SDK

- MongoDB Realm -> Manage Email/Password Users: Correct a link to retry a user confirmation function

## MongoDB Cloud Docs

### Schemas

- Enforce a Schema: add a section about validating null types
- Relationships: add a note about the fact that relationships cannot span partitions

### Functions

- JavaScript Support: New page that combines "Built-In Module Support" & "JavaScript Feature Compatibility"
- External Dependencies: New page that combines "Add External Dependencies" and "Import External Dependencies"

Query MongoDB Atlas

- Move the Query MongoDB Atlas section to Functions in the navigation
- Rename "Find Documents" to "Read Data from MongoDB Atlas - Functions" & expand an example
- Aggregate: Rename "Run Aggregation Pipelines" to "Aggregate Data in MongoDB Atlas - Functions", expand code example

### Logs

- View Logs in the Realm UI: New page

### Reference

- Realm Admin API: Add `unordered` field to DB triggers
- Realm Query Language: Remove `@avg` from Flex Sync supported operation on array fields
- Service Limitations: Update Request Traffic limits info

# April 22, 2022

## SDK Docs

### Java SDK

Usage Examples

- Display Collections: Refactor to improve readability
- Reset a Client Realm: Refactor to improve readability

### Node.js SDK

- Fundamentals -> Write Transactions: Refactor to improve readability

### React Native SDK

- Fundamentals -> Write Transactions: Refactor to improve readability
- Advanced Guides -> Bundle a Realm: Update the page for details specific to RN vs. Node.js process

## MongoDB Cloud Docs

### Realm Sync

Define Data Access Patterns

- Partition-Based Sync: Refactor to improve readability
- Flexible Sync: Update to add arrays of primitives as valid queryable fields

### MongoDB Data Access

Atlas Clusters & Data Lakes -> Document Preimages: Refactor to improve readability

### HTTPS Endpoints

- Create an HTTPS Endpoint: Clarify Webhook vs. HTTPS endpoint body behavior

### Functions

- Context: New page that combines "Access Function Context" and "Context Modules" pages
- Global Modules: New page that combines "Utility Packages" and "JSON & BSON" pages

### Triggers

- About Triggers: Refactor to improve readability

### Reference

- Realm Query Language: Update Flex Sync Unsupported Query Operators (Remove `BETWEEN`, `BEGINSWITH`, `ENDSWITH`, `CONTAINS` as these are now supported)

### Third-Party Services [Deprecated]

- Convert Webhooks to HTTPS Endpoints: Clarify Webhook vs. HTTPS endpoint body behavior

# April 15, 2022

## SDK Docs

### Swift SDK

- Fundamentals -> Realms: Typo fix
- Advanced Guides -> Client Reset: Incorporate tech review feedback
- Usage Examples -> Define a Realm Object Schema: add a note about to-one relationships being optional

### Node.js SDK

- Usage Examples
  - Sync Changes Between Devices: clarify session multiplexing, clarify description of params for syncSession.addProgressNotification()
  - Open & Close a Realm: Typo fix
- Fundamentals -> Realms: Typo fix

### React Native SDK

- Usage Examples
  - Sync Changes Between Devices: clarify session multiplexing, clarify description of params for syncSession.addProgressNotification()

### Web SDK

- Add API Reference docs to Web SDK sidebar
- Remove "Reference" from sidebar and move its two pages up to the main Web SDK sidebar menu
- Fix broken link on main page

### Flutter SDK

- Define Realm Object Schema: fix broken link

## MongoDB Cloud Docs

### MongoDB Data Access

- Atlas Clusters & Data Lakes
  - Rename "Specify Read Preference for a MongoDB Cluster" to "Read Preference"
  - Combine "Enable Wire Protocol Connections" and "Connect Over the Wire Protocol" into a new page called "Wire Protocol"
  - Rename "View & Disable Collection-level Preimages" to "Document Preimages"
  - New Internal Database Usage page with details about system-generated cluster users, transactional locks, and unsynced documents

### MongoDB Realm

- Users & Authentication
  - Authentication Providers: Refactor to improve readability
  - Custom JWT Authentication: Add a Firebase JWT Authentication guide
- Realm Sync: Add client reset warnings to pages that mention terminating sync
  - Define Data Access Patterns -> Partition-based Sync
  - Configure and Update Your Data Model -> Make Breaking Schema Changes
  - Handle Errors -> Client Resets: Add a note about upgrading a cluster causing a client reset
  - Reference -> Upgrade a Shared Tier Cluster

### Admin API

- Create Functions endpoint: update response body
- Create an Endpoint and Modify an Endpoint: fix broken links

Many Pages Across Docs

- Remove alt apostrophe character ’ and replace with '

# April 8, 2022

## SDK Docs

### Java SDK

- Removed no-longer-needed certificate warning for Android 6.0 and below
- Streamlined install page, added guidance on installation for projects that use Gradle's plugin syntax

### .Net SDK

- Fixed list of primary key/indexable types

### Node.JS SDK

- Fixed list of primary key/indexable types

### React Native SDK

- Fixed list of primary key/indexable types

## MongoDB Cloud Docs

### Reference -> Realm Query Language

- Fixed @count limitations

### Manage & Deploy Realm Apps -> Create -> Template Apps

- Cleaned up wording, typos, linkage in the Template Apps page

### Functions

- Updated wording of timeout description to make timeout period more discoverable

# April 1, 2022

## SDK Docs

### Java SDK

- Encrypt a Realm: Add a section about not accessing an encrypted realm from multiple processes
- Sync a Realm in the Background: New page w/tested code examples for syncing Realm in the background
- Link User Identities: Update info and code examples to provide additional guidance

### Swift SDK

- Encrypt a Realm: Add a note to the section about not accessing an encrypted realm which describes the error
- Update several pages with a version requirement table to use Swift async/await syntax/APIs
- Client Reset: Add docs for new client reset mode w/the ability to discard local changes for a seamless client reset
- SwiftUI Guide: Additional information around migration when using SwiftUI
- Threading
  - Add section about realm supporting only serial queues for background threads, not concurrent queues
  - Add note about ThreadSafeReference and @ThreadSafe wrapper conforming to `Sendable`

### .Net SDK

- Encrypt a Realm: Add a section about not accessing an encrypted realm from multiple processes
- Unity: Update known issues:
  - Remove "only supports Intel64 Macs"
  - Clarify issues with multiple processes; specify crashes are related to synced realms only, not local realms

### Node.js SDK

- Encrypt a Realm: Add a section about not accessing an encrypted realm from multiple processes

### React Native SDK

- Test & Debug: New page with recommendations and some basic guidance about testing & debugging
- Encrypt a Realm: Add a section about not accessing an encrypted realm from multiple processes
- Quick Start with Expo: New page w/code examples for using the Realm Expo template to initialize, build and run, and deploy a project
- Use Realm React: New page w/code examples about using the Realm React npm package to use realm through React hooks

### Flutter SDK

- React to Changes: New page about using change listeners w/tested, Bluehawked code examples
- Quick Start: Update Quick Start with tested, Bluehawked code examples for using change listeners

## MongoDB Cloud Docs

- Realm Sync/Define Data Access Patterns/Flexible Sync: Add section for reserved field names
- Users & Authentication
  - Authentication Providers/Anonymous Authentication: Remove refresh token expiration references, emphasize inactive user deletion & explicit logout
  - Enable User Metadata: Refactor to improve readability
- Rules/Expressions
  - Show $Operator over %operator when possible (on this page and in several others)
  - Provide additional information and examples about expansion variables
  - Restructure to remove tables
- Functions/Add External Dependencies: Update `node_module` size cap from 10MB to 15MB
- Values & Secrets: add a link to the info about accessing environment values in a function context
  - Access a Value: add a link to the info about accessing environment values in a function context

# March 25, 2022

## SDK Docs

### Java SDK

- Add note about ISRG Root X1 certificates for Android 6 and lower devices to Install and Troubleshooting pages
- Updates for the generated Java API reference (fix links, add titles to index pages for breadcrumb reasons)
- Updates based on feedback from engineering

### Swift SDK

- Quick Start - Realm in Xcode Playgrounds: New page describing how to use Realm in Xcode Playgrounds, organize Quick Starts under a ToC item
- Fundamentals -> Relationships: Refactor to improve readability
- Authenticate: Update Facebook Auth code example to use current version of FacebookLogin
- iOS Test Suite: Switch dependency manager from CocoaPods to Swift Package Manager
- Collections: Update AnyRealmCollection code example which broke in a recent release
- Update code example for encrypted realms which broke in a recent release
- Authenticate Users: Add code example for Google User showing ID Token authentication

### .Net SDK

- Sync Changes Between Devices: Add note about HelpLink and clarify wording of a few other notes

### Kotlin SDK

- Updates based on feedback from engineering

### Flutter SDK

- Open and Close a Realm: Add sections for read-only realm, in-memory realm, set custom FIFO special file path
- Read and Write Data: Add docs for querying RealmList of RealmObjects, remove note about fllutter for Linux desktop not being supported
- Data Types: New page listing supported data types
- Define a Realm Object Schema: New page describing how to define a Realm Object Schema

## MongoDB Cloud Docs

### Manage & Deploy Realm Apps

- Create -> Template Apps: Add SwiftUI template app to the list of available template apps
- Application Security
  - Add note clarifying the Firewall Configuration IP list only applies to outgoing requests from functions/triggers/HTTPS endpoints, not requests that originate from the Sync server
  - Add note about communication between Realm and Atlas being encrypted with x509 certificates

### Users & Authentication

- Authentication Providers -> Custom Function Authentication: Provide clearer guidance on `identities`, general updates & improvements

Many Docs Pages

- As part of the subdomain consolidation project, many folks updated many URLs across Realm docs pages. Nice work, everyone!
- Various dependabot updates

# March 18, 2022

## Get Started

- Getting Help: Expand description of Professional Support & Forums

## SDK Docs

### Java SDK

- Query Engine: Add link to RQL reference, info about when to use Java SDK Fluent Interface vs. RQL

### Swift SDK

- SwiftUI Guide:
  - Add migration section w/examples
  - Add section about Filtering w/new ObservedResults type-safe query example
- Rename "Reference Manual" in sidebar to "API Reference"

### .Net SDK

- Update Realm .Net version
- Query Engine: Add info for when to use LINQ and when to use RQL
- Flexible Sync: Add link to query engine page, provide info about `Add` method, clarify duplicate subscriptions note
- Rename "Reference Manual" in sidebar to "API Reference"
- Sync Changes Between Devices: Update API reference link and code example for setting log level

### Node.js SDK

- Query Engine: Add link to RQL reference
- Flexible Sync: Add info about supported queries, link to RQL Flex Sync Limitations
- Rename "Reference Manual" in sidebar to "API Reference"
- Update deprecated `serverApiKey` usage to `apiKey` in examples
- Refactor data type unit tests to simplify Bluehawk commands and remove persistent state

### React Native SDK

- Query Engine: Add link to RQL reference
- Flexible Sync: Add info about supported queries, link to RQL Flex Sync Limitations, update Flexible Sync subscription syntax
- Rename "Reference Manual" in sidebar to "API Reference"
- Update deprecated `serverApiKey` usage to `apiKey` in examples
- Refactor data type unit tests to simplify Bluehawk commands and remove persistent state

### Kotlin SDK

- Install process fixes - the definitive version
- Rename "Reference Manual" in sidebar to "API Reference"

### Flutter SDK

- Rename "Reference Manual" in sidebar to "API Reference"

## MongoDB Cloud Docs

### Users & Authentication

- Custom JWT Authentication: add kid header for JWKS

### Sync

- Flexible Sync:
  - Add link from Eligble Field Types to RQL Reference for Flex Sync query options
  - Add links to Node.js and RN Flexible Sync pages
- Choose Your Sync Mode: Update JS Flex Sync query syntax
- Sync Rules and Permissions:
  - Update permissions syntax, fix JSON errors in examples
  - Add info about session roles, expansions, client resets, add Flexible Sync Expansion quick-reference table
- Update Your Schema: Add workaround to avoid changing property name breaking change by using mapTo or similar API in the SDKs that offer it
- Make Breaking Schema Changes: Add early return to partner collection funcs to avoid errors
- Client Resets: Add information about Flex Sync session role changes that cause client resets

### Schemas

- Relationships: add embedded object relationship examples

### Reference

- Realm Query Language Reference: Add links to SDK-specific query pages

Many Docs Pages

- As part of the language update changing "additive" and "destructive" schema changes to "non-breaking" and "breaking" - update references on MANY pages across docs

# March 11, 2022

## Tutorial

- Set up the Backend: Add tutorial video as an embedded video
- iOS with Swift: Add tutorial videos as embedded videos to both Part 1 and Part 2
- Write a Serverless GitHub Contribution Tracker: Tutorial updated to use HTTPS endpoints

## SDK Docs

### Java SDK

- Install: bump required JDK version to 9

### Swift SDK

- Filter Data: Add `IN` type-safe query example per SDK 10.23.0 release

### .Net SDK

- Replace `SyncConfiguration` references with `PartitionSyncConfiguration`
  in copy and code examples

### Kotlin SDK

- Landing Page, Install, Quick Start: small improvements based on SDK team feedback

### Web SDK

- Add GitHub Action to run Web SDK unit tests on relevant PRs

### Flutter SDK

- Read & Write Data: new page with code examples
- Query Language: new page

## MongoDB Cloud Docs

### Sync

- Update a Schema: Major page refactor to more clearly communicate breaking/non-breaking changes to schema and object model
- Make Destructive Schema Changes: naming updated to "Make Breaking Schema Changes" & small tweaks throughout page for naming

### Realm Admin API

- adminGetLogs API endpoint: Add "type" enum and improve "error_only" information

# March 4, 2022

## SDK Docs

### Java SDK

- Switch Java API Reference to use Yokedox-generated output directly in docs site
- Query MongoDB: new section with use cases for querying MongoDB remotely

### Swift SDK

- Configure & Open a Realm: new sections for converting between local/synced
  realms/sync configurations
- Bundle a Realm: New procedures for bundling a synced realm
- Create and Delete Users: new page w/code examples for deleting a user
- Work with Users: new section about creating and deleting users
- Query MongoDB: new section with use cases for querying MongoDB remotely

### .Net SDK

- Query MongoDB: new section with use cases for querying MongoDB remotely

### Node.JS SDK

- Sync Changes Between Devices: Additional information about partition value
- Update Jest configuration to make tested code examples work with Realm Sync
- Query MongoDB: new section with use cases for querying MongoDB remotely

### React Native SDK

- Sync Changes Between Devices: Additional information about partition value
- Query MongoDB: new section with use cases for querying MongoDB remotely

### Kotlin SDK (alpha)

- Install: Additional info
- New section: Realm Database, covering CRUD operations, schemas, open & closing
  a realm, query language, write transactions, and concept information
- New section: Sync, covering concept overview and pening a synced realm
- Migrate from the Java SDK to the Kotlin SDK: New guide w/tested code examples

### Web SDK

- Create Bluehawked & tested code examples for:
  - Work with Multiple Users
  - Create & Manage API Keys
  - Authenticate a User
  - Manage Email/Password Users
  - Link User Identities

## MongoDB Cloud Docs

### Sync

- Sync Rules and Permissions: Flexible Sync: add links and minor tweaks

### Users

- Create a User: additional information about creating users
- Delete a User: new section about deleting users in the SDK

# Feb 25, 2022

## SDK Docs

### Android SDK

- Rename to Java SDK

### .NET SDK

- For `DateTimeOffset`, note that timezone information is lost

### Node.js SDK

- Fixes for Flexible Sync examples, new Add a Query Flex Sync example
- Add documentation for new .deleteUser() method

### React Native SDK

- Fixes for Flexible Sync examples, new Add a Query Flex Sync example
- Add documentation for new .deleteUser() method

### Kotlin SDK (alpha)

- Add page for Sync, including tested code examples

### Web SDK

- Add documentation for new .deleteUser() method
- Convert Apollo GraphQL code examples to tested, Bluehawked code snippets

## MongoDB Cloud Docs

### Sync

- Flexible Sync Roles renamed Flexible Sync Session Roles, more info to clarify Flexible Sync role & rule behavior
- Flexible Sync Configuration: Remove callout about shared clusters not running MDB 5.0

### Functions

- Define a Function: Clarify that you can define functions inside of nested folders

### Manage Realm Apps

- Export a Realm App with Realm API: Fixes for app export procedure

### Triggers

- Fix a redirect loop

### Realm Admin API

- Custom HTTPS endpoints APIs added
- Typo fixes, rearrange and simplify `tags`, and distinguish `summary` from `description` to improve Redoc implementation

# Feb 18, 2022

## SDK Docs

### Android SDK

- Add Flexible Sync callouts re: required subscription and object links

### Swift SDK

- Publish tutorial videos
- Update the tutorial copyright date
- Add a tip about deleting vs. migrating realm when in development
- Add more guidance around compacting
- Add Flexible Sync callouts re: required subscription and object links
- SwiftUI Quick Start improvements

### .NET SDK

- Add a tip about deleting vs. migrating realm when in development
- Add more guidance around compacting
- Add Flexible Sync callouts re: required subscription and object links

### Node.js SDK

- Add a tip about deleting vs. migrating realm when in development
- Add Flexible Sync callouts re: required subscription and object links
- Refactor Relationships & Embedded Objects page to improve readability

### React Native SDK

- Add a tip about deleting vs. migrating realm when in development
- Add Flexible Sync callouts re: required subscription and object links
- Refactor Relationships & Embedded Objects page to improve readability

### Web SDK

- Update examples to tested examples that use Bluehawk

## MongoDB Cloud Docs

### Logs

- Fix Application Log retention time

### HTTPS Endpoints

- Reorganize and expand the HTTPS Endpoints section
- Add HTTPS Authentication info
- Add migration guide to Convert Webhooks to HTTPS Endpoints
- Update configuration

### Third-Party Services

- Replace Services with npm Modules: Add some guidance + examples for Axios, Twilio, AWS

### Custom User Data

- Add size limit guidance
