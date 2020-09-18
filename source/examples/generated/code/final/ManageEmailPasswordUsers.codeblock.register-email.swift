        XCTAssertEqual(error!.localizedDescription, "name already in use")
        expectation.fulfill()
        return
    }
    // Registering just registers. You can now log in.
    print("Successfully registered user.")
    expectation.fulfill()
}