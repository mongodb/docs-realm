import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';

const PERSON_ID = new Realm.BSON.ObjectId();
const PETOWNER_ID = new Realm.BSON.ObjectId();
const PET_ID = new Realm.BSON.ObjectId();
const EMPLOYEE_ID  = new Realm.BSON.ObjectId();
const COMPANY_ID = new Realm.BSON.ObjectID(); 

/*** Schemas & Config ***/
// :snippet-start: create-object-schema
class Person extends Realm.Object<Person> {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    age?: number;
  
    static schema = {
        name: 'Person',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            age: 'int?',
        },
    };
}
// :snippet-end:

// :snippet-start: create-to-one-schema
class Pet extends Realm.Object<Pet> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  age!: number;
  animalType!: string;

  static schema = {
    name: 'Pet',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
        name: 'string',
        age: 'int',
        animalType: 'string?',
    },
  };
}

class PetOwner extends Realm.Object<PetOwner> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  age?: number;
  pet?: Pet;
  
  static schema = {
    name: 'PetOwner',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int',
      pet: 'Pet?'
    },
  };
}
// :snippet-end:

// :snippet-start: create-to-many-schema
class Employee extends Realm.Object<Employee> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  birthdate!: Date;

  static schema = {
    name: 'Employee',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      birthdate: 'date',
    },
  };
}

class Company extends Realm.Object<Company> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  employees!: Realm.List<Employee>
  
  static schema = {
    name: 'Company',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      employees: {
        type: 'list',
        objectType: 'Employee',
        optional: false,
      },
    },
  };
}
// :snippet-end:

const realmConfig = {
    schema: [Person, Pet, PetOwner, Employee, Company],
    deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm, useQuery, useObject} = createRealmContext(realmConfig);

/*** Creating Object ***/
// :snippet-start: crud-create-object
const CreatePersonInput = () => {
  const [name, setName] = useState('Jane');
  const realm = useRealm();

  const handleAddPerson = () => {
    realm.write(() => {
      realm.create('Person', {_id: PERSON_ID, name: name, age: 25});
    });
  };

  return (
    <>
      <TextInput onChangeText={setName} value={name} />
      <Button
        onPress={() => handleAddPerson()}
        title='Add Person'
        testID='handleAddPersonBtn' // :remove:
      />
    </>
  );
};
// :snippet-end:

/*** Creating To-One Object ***/
// :snippet-start: crud-create-to-one-object
const CreatePetOwnerInput = () => {
  const [ownerName, setOwnerName] = useState('Jane')
  const realm = useRealm();
  const newPet = useObject(Pet, PET_ID);

  const handleAddPetOwner = () => {

    // Create a new Pet object
    realm.write(() => {
      realm.create('Pet', {_id: PET_ID, name: 'Fido', age: 1, animalType: 'Dog'});
    });

    // Create a new Pet Owner object, pass new Pet object in pet field
    realm.write(() => {
      realm.create('PetOwner', {
        _id: PETOWNER_ID, 
        name: ownerName, 
        age: 25, 
        pet: newPet
      })
    });
  };

  return (
    <>
      <TextInput onChangeText={setOwnerName} value={ownerName} />
      <Button
        onPress={() => handleAddPetOwner()}
        title='Add New Pet Owner'
        testID='handleAddPetOwnerBtn' // :remove:
      />
    </>
  );
}
// :snippet-end:

/*** Creating To-Many Object ***/
// :snippet-start: crud-create-to-many-object
const CreateNewEmployeeInput = () => {
  const employees = useQuery(Employee);
  const [employeeName, setEmployeeName] = useState('Angela Martin');
  const realm = useRealm();

  // Create a new Company object - wrapped in a useEffect with empty dependency to avoid unecessary rendering
  useEffect(() => {
    realm.write(() => {
      realm.create('Company', {
        _id: COMPANY_ID, 
        name: 'Dunder Mifflin', 
        employees: employees
      })
    });
  }, []); 
  
  // Add a new Employee to our Company object
  const handleAddEmployee = () => {
    realm.write(() => {
        realm.create('Employee', {
          _id: EMPLOYEE_ID, 
          name: employeeName, 
          birthdate: new Date('1971-6-25')
        })
    })
  }

  return (
    <>
      <TextInput onChangeText={setEmployeeName} value={employeeName} />
      <Button
        onPress={() => handleAddEmployee()}
        title='Add New Employee'
        testID='handleAddEmployeeBtn' 
      />
    </>
  );
}
// :snippet-end:

/*** Testing ***/

// render an App component, giving the CreatePersonInput component access to the @realm/react hooks:
const App = () => (
    <RealmProvider>
      <CreatePersonInput />
      <CreatePetOwnerInput />
      <CreateNewEmployeeInput />
    </RealmProvider>
  );

describe('Sync Data Unidirectionally from a Client App', () => {

    let assertionRealm: Realm;

    beforeEach(async () => {
        // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
        assertionRealm = await Realm.open(realmConfig);
    
        // delete every object in the realmConfig in the Realm to make test idempotent
        assertionRealm.write(() => {
          assertionRealm.delete(assertionRealm.objects('Person'));
          assertionRealm.delete(assertionRealm.objects('Pet'));
          assertionRealm.delete(assertionRealm.objects('PetOwner'));
          assertionRealm.delete(assertionRealm.objects('Company'));
          assertionRealm.delete(assertionRealm.objects('Employee'));
        });
        //Realm.clearTestState(); --> this was giving a seg fault?
      });

    afterAll(() => {
      if (!assertionRealm.isClosed) {
          assertionRealm.close();
      }
    });

    test('Create a New Object', async () => {
      const {findByTestId} = render(<App />);

      // get the "Add Person" button
      const handleAddPersonBtn = await findByTestId('handleAddPersonBtn');
  
      //press the "Add Person" button
      await act(async () => {
          fireEvent.press(handleAddPersonBtn);
      });

      // check if the new Person object has been created
      const newPerson = assertionRealm.objects(Person).filtered("_id == $0", PERSON_ID)[0];

      // check if new Person object has correct properties
      expect(newPerson._id).toEqual(PERSON_ID);
      expect(newPerson.name).toBe('Jane');
      expect(newPerson.age).toBe(25);
    });

    test('Create an Obj with To-One Relationship', async () => {
      const {findByTestId} = render(<App />);

      // get the "Add Pet Owner" button
      const handleAddPetOwnerBtn = await findByTestId('handleAddPetOwnerBtn');
  
      //press the "Add Pet Owner" button
      await act(async () => {
          fireEvent.press(handleAddPetOwnerBtn);
      });

      //check if the new Pet & Pet Owner objects have been created
      const newPetOwner = assertionRealm.objects(PetOwner).filtered("_id == $0", PETOWNER_ID)[0];
      const newPet = assertionRealm.objects(Pet).filtered("_id == $0", PET_ID)[0];

      // check if new Person object has correct properties
      expect(newPetOwner._id).toEqual(PETOWNER_ID);
      expect(newPetOwner.name).toBe('Jane');
      expect(newPetOwner.age).toBe(25);
      expect(newPet._id).toEqual(PET_ID);
      expect(newPet.name).toBe('Fido');
      expect(newPet.age).toBe(1);
    });

    test('Create an Obj with To-Many Relationship', async () => {
      const {findByTestId} = render(<App />);

      // get & press the "Add Employee" button
      const handleAddEmployeeBtn = await findByTestId('handleAddEmployeeBtn');
      await act(async () => {
          fireEvent.press(handleAddEmployeeBtn);
      });

      //check if the new Company and Employee objects has been created
      const newCompany = assertionRealm.objects(Company).filtered("_id == $0", COMPANY_ID)[0];
      const newEmployee = assertionRealm.objects(Employee).filtered("_id == $0", EMPLOYEE_ID)[0];

      // check if new Company and Employee objects correct properties
      expect(newCompany._id).toEqual(COMPANY_ID);
      expect(newCompany.name).toBe('Dunder Mifflin');
      expect(newEmployee._id).toEqual(EMPLOYEE_ID);
      expect(newEmployee.name).toBe('Angela Martin');
      expect(newEmployee.birthdate).toEqual(new Date('1971-6-25'));
    });
});
