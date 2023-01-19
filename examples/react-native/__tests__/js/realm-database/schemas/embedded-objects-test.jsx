import React, {useState} from 'react';
import {Button, TextInput, View, Text} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Address from '../../Models/Address';
import Contact from '../../Models/Contact';

const realmConfig = {
  schema: [Address, Contact],
  deleteRealmIfMigrationNeeded: true,
};
 
const {RealmProvider, useQuery, useRealm} = createRealmContext(realmConfig);

let assertionRealm;

// test describe block for the embedded objects page
describe('embedded objects tests', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects(Contact));

      new Contact(assertionRealm, {
        name: 'John Smith',
        _id: new Realm.BSON.ObjectID(),
        address: {
          street: '1 Home Street',
          city: 'New York City',
          country: 'USA',
          postalCode: '12345',
        },
      });

      new Contact(assertionRealm, {
        name: 'Jane Doe',
        _id: new Realm.BSON.ObjectID(),
        address: {
          street: '2 Home Street',
          city: 'Kansas City',
          country: 'USA',
          postalCode: '54321',
        },
      });
    });
  });
  afterAll(() => {
    // close realm
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });
  it("should create and read an embedded object", async () => {
    // :snippet-start: create-embedded-object
    // :replace-start: {
    //  "terms": {
    //   "LeBron James": "",
    //   "1 Goat Drive": "",
    //   "Cleveland": "",
    //   "USA": "",
    //   "12345": "",
    //   " testID='submitContactBtn'": ""
    //   }
    //  }

    const CreateContact = () => {
      const [name, setContactName] = useState('LeBron James');
      const [street, setStreet] = useState('1 Goat Drive');
      const [city, setCity] = useState('Cleveland');
      const [country, setCountry] = useState('USA');
      const [postalCode, setPostalCode] = useState('12345');
      const realm = useRealm();

      const submitContact = () => {
        // Create a Contact within a write transaction
        realm.write(() => {
          // Create an embedded Address object
          const address = {
            street,
            city,
            country,
            postalCode,
          };
          new Contact(realm, {
            _id: new Realm.BSON.ObjectID(),
            name,
            address, // Embed the address in the Contact object
          });
        });
      };
      return (
        <View>
          <TextInput value={name} onChangeText={text => setContactName(text)} />
          <TextInput value={street} onChangeText={text => setStreet(text)} />
          <TextInput value={city} onChangeText={text => setCity(text)} />
          <TextInput value={country} onChangeText={text => setCountry(text)} />
          <TextInput value={postalCode} onChangeText={text => setPostalCode(text)} />
          <Button title='Submit Contact' testID='submitContactBtn' onPress={submitContact} />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <CreateContact/>
      </RealmProvider>
    );
    const {findByTestId} = render(<App />);
    const submitContactBtn = await waitFor(() => findByTestId('submitContactBtn'), {
      timeout: 5000,
    });
    await act(async () => {
      fireEvent.press(submitContactBtn);
    });
    // check if the new Contact object has been created
    const contact = assertionRealm.objects(Contact).filtered("name == 'LeBron James'")[0];
    expect(contact.name).toBe('LeBron James');
    expect(contact.address.street).toBe('1 Goat Drive');
    expect(contact.address.city).toBe('Cleveland');
    expect(contact.address.country).toBe('USA');
    expect(contact.address.postalCode).toBe('12345');
  });
  it('should query for an embedded object', async () => {
    // :snippet-start: query-embedded-object
    // :replace-start: {
    //  "terms": {
    //   " testID = 'addressText'": ""
    //   }
    // }
    const ContactList = () => {
      // Query for all Contact objects
      const contacts = useQuery(Contact);
      
      // Run the `.filtered()` method on all the returned Contacts to find the 
      // contact with the name "John Smith" and the corresponding street address
      const contactAddress = contacts
        .filtered("name == 'John Smith'")[0].address.street; 
    
      return(
        <View>
          <Text>John Smith's street address:</Text>
          <Text testID = 'addressText'>{contactAddress}</Text>
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <ContactList />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);

    // test that querying for name works
    const contactAddress = await waitFor(() => getByTestId('addressText'), {
      timeout: 5000,
    });
    expect(contactAddress.props.children).toBe('1 Home Street');
  });
  it('should delete an embedded object', async () => {
    // :snippet-start: delete-embedded-object
    // :replace-start: {
    //  "terms": {
    //   " testID = 'contactNameText'": "",
    //   " testID = 'deleteContactBtn'": ""
    //   }
    // }
    const ContactInfo = ({contactName}) => {
      const contacts = useQuery(Contact);
      const toDelete = contacts.filtered(`name == '${contactName}'`)[0]
      const realm = useRealm();

      const deleteContact = () => {
        realm.write(() => {
          // Deleting the contact also deletes the embedded address of that contact
          realm.delete(
            toDelete
          );
        });
      };
      return (
        <View>
          <Text testID='contactNameText'>{contactName}</Text>
          <Button testID='deleteContactBtn' onPress={deleteContact} title='Delete Contact' />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <ContactInfo contactName='John Smith'/>
      </RealmProvider>
    );
    const {findByTestId} = render(<App />);
    const contactNameText = await waitFor(() => findByTestId('contactNameText'), {
      timeout: 5000,
    });
    expect(contactNameText.props.children).toBe('John Smith');

    const deleteContactBtn = await waitFor(() => findByTestId('deleteContactBtn'), {
      timeout: 5000,
    });
    await act(async () => {
      fireEvent.press(deleteContactBtn);
    });
    // check if the new Contact object has been deleted
    const contact = assertionRealm.objects(Contact)
    expect(contact.length).toBe(1);
  });
  it("should update an embedded object", async () => {
    // :snippet-start: update-embedded-object
    // :replace-start: {
    //  "terms": {
    //   " testID='updateContactBtn'": "",
    //   "3 jefferson lane": ""
    //   }
    // }
    // Find the contact you want to update
    const UpdateContact = ({contactName}) => {
      const [street, setStreet] = useState('3 jefferson lane');
      const contact = useQuery(Contact).filtered(`name == '${contactName}'`)[0];
      const realm = useRealm();

      const updateStreet = () => {
        // Modify the property of the embedded Address object in a write transaction
        realm.write(() => {
          // Update the address directly through the contact
          contact.address.street = street;
        });
      };
      return (
        <View>
          <Text>{contact.name}</Text>
          <TextInput value={street} onChangeText={setStreet} placeholder='Enter New Street Address' />
          <Button testID='updateContactBtn' onPress={updateStreet} title='Update Street Address' />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <UpdateContact contactName='John Smith'/>
      </RealmProvider>
    );
    const {findByTestId} = render(<App />);
    const updateContactBtn = await waitFor(() => findByTestId('updateContactBtn'), {
      timeout: 5000,
    });
    await act(async () => {
      fireEvent.press(updateContactBtn);
    });
    // check if the new Contact object has been updated
    const contact = assertionRealm.objects(Contact).filtered("name == 'John Smith'")[0];
    expect(contact.address.street).toBe('3 jefferson lane');
  });
  it("should overwrite an embedded object", async () => {
    // :snippet-start: overwrite-embedded-object
    // :replace-start: {
    //  "terms": {
    //   " testID='overwriteContactBtn'": "",
    //   "12 Grimmauld Place": "",
    //   "London": "",
    //   "UK": "",
    //   "E1 7AA": ""
    //   }
    // }
    const OverwriteContact = ({contactName}) => {
      const [street, setStreet] = useState('12 Grimmauld Place');
      const [city, setCity] = useState('London');
      const [country, setCountry] = useState('UK');
      const [postalCode, setPostalCode] = useState('E1 7AA');
      const contact = useQuery(Contact).filtered(`name == '${contactName}'`)[0];
      const realm = useRealm();

      const updateAddress = () => {
        realm.write(() => {
          // Within a write transaction, overwrite the embedded object with the new address
          const address = {
            street,
            city,
            country,
            postalCode,
          };
          contact.address = address;
        });
      };
      return (
        <View>
          <Text>{contact.name}</Text>
          <Text>Enter the new address:</Text>
          <TextInput value={street} onChangeText={setStreet} placeholder='Street' />
          <TextInput value={city} onChangeText={setCity} placeholder='City' />
          <TextInput value={country} onChangeText={setCountry} placeholder='Country' />
          <TextInput value={postalCode} onChangeText={setPostalCode} placeholder='Postal Code' />
          <Button testID='overwriteContactBtn' onPress={updateAddress} title='Overwrite Address' />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <OverwriteContact contactName='John Smith'/>
      </RealmProvider>
    );
    const {findByTestId} = render(<App />);
    const overwriteContactBtn = await waitFor(() => findByTestId('overwriteContactBtn'), {
      timeout: 5000,
    });
    await act(async () => {
      fireEvent.press(overwriteContactBtn);
    });
    // check if the new Contact object has been overwritten
    const contact = assertionRealm.objects(Contact).filtered("name == 'John Smith'")[0];
    expect(contact.address.street).toBe('12 Grimmauld Place');
    expect(contact.address.city).toBe('London');
    expect(contact.address.country).toBe('UK');
    expect(contact.address.postalCode).toBe('E1 7AA');
  });
});
