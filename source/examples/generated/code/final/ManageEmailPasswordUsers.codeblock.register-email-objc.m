        XCTAssertEqualObjects([error localizedDescription], @"name already in use");
        [expectation fulfill];
        return;
    }
    // Registering just registers. You can now log in.
    NSLog(@"Successfully registered user.");
    [expectation fulfill];
}];