RLMRealm *realm = [RLMRealm defaultRealm];
RLMResults<Contact *> *losAngelesContacts = [Contact
    objectsInRealm:realm
    withPredicate:
        [NSPredicate predicateWithFormat:@"address.city = %@" argumentArray:@[@"Los Angeles"]]
];

losAngelesContacts = [losAngelesContacts sortedResultsUsingKeyPath:@"address.street" ascending:YES]; 
NSLog(@"Los Angeles Contacts: %@", losAngelesContacts);
