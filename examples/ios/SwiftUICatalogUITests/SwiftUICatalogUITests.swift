import XCTest

class SwiftUICatalogUITests: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testPartitionBasedSyncLogin() throws {
        // UI tests must launch the application that they test.
        let app = XCUIApplication()
        app.launchEnvironment["MyUITestsCustomView"] = "true"
        app.launchEnvironment["MyCustomViewName"] = "PBSContentView"
        app.launch()

        let loginButton = app.buttons["Log in anonymously"]
        if loginButton.exists {
            loginButton.tap()
        }
        
        XCTAssert(app.staticTexts["Successfully opened the realm"].waitForExistence(timeout: 10))
    }
    
    func testFlexibleSyncLogin() throws {
        // UI tests must launch the application that they test.
        let app = XCUIApplication()
        app.launchEnvironment["MyUITestsCustomView"] = "true"
        app.launchEnvironment["MyCustomViewName"] = "FSContentView"
        app.launch()

        let loginButton = app.buttons["Log in anonymously"]
        if loginButton.exists {
            loginButton.tap()
        }

        XCTAssert(app.staticTexts["Successfully opened the realm"].waitForExistence(timeout: 10))
    }
    
    func testPassRealmObjects() throws {
        let app = XCUIApplication()
        app.launchEnvironment["MyUITestsCustomView"] = "true"
        app.launchEnvironment["MyCustomViewName"] = "PassRealmObjects"
        app.launch()

        XCTAssert(app.staticTexts["Successfully called DogsView and it contains 3 Dogs"].waitForExistence(timeout: 2))
    }
    
    func testDogExists() throws {
        let app = XCUIApplication()
        app.launchEnvironment["MyUITestsCustomView"] = "true"
        app.launchEnvironment["MyCustomViewName"] = "DogDetails"
        app.launch()
        
        XCTAssert(app.staticTexts["Lita is a Lab mix"].waitForExistence(timeout: 2))
    }
    
    func testDogsExistOnProfile() throws {
        let app = XCUIApplication()
        app.launchEnvironment["MyUITestsCustomView"] = "true"
        app.launchEnvironment["MyCustomViewName"] = "ProfileView"
        app.launch()
        
        XCTAssert(app.staticTexts["Ben"].waitForExistence(timeout: 2))
    }
    
    func testDogsAreSearchable() throws {
        let app = XCUIApplication()
        app.launchEnvironment["MyUITestsCustomView"] = "true"
        app.launchEnvironment["MyCustomViewName"] = "SearchableDogsView"
        app.launch()
        
        XCTAssert(app.staticTexts["Ben"].waitForExistence(timeout: 2))
        app.swipeDown()
        let searchBar = app.searchFields.element
        XCTAssert(searchBar.exists)
        searchBar.tap()
        searchBar.typeText("Maui")
        XCTAssert(!app.staticTexts["Ben"].waitForExistence(timeout: 2))
    }
    
    func testFilterNSPredicate() throws {
        let app = XCUIApplication()
        app.launchEnvironment["MyUITestsCustomView"] = "true"
        app.launchEnvironment["MyCustomViewName"] = "FilterNSPredicate"
        app.launch()
        
        XCTAssert(app.staticTexts["Ben"].waitForExistence(timeout: 2))
        XCTAssert(!app.staticTexts["Lita"].exists)
    }
    
    func testFilterTypeSafeQuery() throws {
        let app = XCUIApplication()
        app.launchEnvironment["MyUITestsCustomView"] = "true"
        app.launchEnvironment["MyCustomViewName"] = "FilterTypeSafeQuery"
        app.launch()
        
        XCTAssert(app.staticTexts["Ben"].waitForExistence(timeout: 2))
        XCTAssert(!app.staticTexts["Lita"].exists)
    }
    
    func testQuickWriteEditProperty() throws {
        let app = XCUIApplication()
        app.launchEnvironment["MyUITestsCustomView"] = "true"
        app.launchEnvironment["MyCustomViewName"] = "EditDogDetails"
        app.launch()
        
        XCTAssert(app.staticTexts["Lita"].waitForExistence(timeout: 2))
        app.buttons["Edit favorite toy"].tap()
        let favoriteToy = app.textFields["Favorite toy"]
        let deleteString = String(repeating: XCUIKeyboardKey.delete.rawValue, count: 12)
        favoriteToy.tap()
        favoriteToy.typeText(deleteString)
        favoriteToy.typeText("Bone")
        app.buttons["Back"].tap()
        XCTAssert(app.staticTexts["Bone"].waitForExistence(timeout: 2))
    }
    
    func testQuickWriteCollection() throws {
        let app = XCUIApplication()
        app.launchEnvironment["MyUITestsCustomView"] = "true"
        app.launchEnvironment["MyCustomViewName"] = "WriteToCollection"
        app.launch()
        
        XCTAssert(app.staticTexts["Lita"].waitForExistence(timeout: 2))
        app.buttons["addDogButton"].tap()
        XCTAssert(app.staticTexts["Bandido"].waitForExistence(timeout: 2))
    }
    
    func testSectionedResultsList() throws {
        let app = XCUIApplication()
        app.launchEnvironment["MyUITestsCustomView"] = "true"
        app.launchEnvironment["MyCustomViewName"] = "SectionedResultsList"
        app.launch()
        
        XCTAssert(app.staticTexts["L"].waitForExistence(timeout: 2))
        XCTAssert(app.staticTexts["Lita"].exists)
    }
    
    func testSectionedResultsListFiltered() throws {
        let app = XCUIApplication()
        app.launchEnvironment["MyUITestsCustomView"] = "true"
        app.launchEnvironment["MyCustomViewName"] = "SectionedResultsListFiltered"
        app.launch()
        
        XCTAssert(app.staticTexts["M"].waitForExistence(timeout: 2))
        XCTAssert(app.staticTexts["Maui"].exists)
        XCTAssert(!app.staticTexts["Lita"].exists)
    }
}
