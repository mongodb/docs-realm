import React from "react";
import { Button, TextInput } from "react-native";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import Realm from "realm";
import { createRealmContext } from '@realm/react'


// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
class Dog extends Realm.Object {
    static schema = {
        name: "Dog",
        properties: {
            name: "string",
            owner: "Person?",
            age: "int?",
        }, 
    }
}

class Person extends Realm.Object {
    static schema = {
        name: "Person",
        properties: {
            name: "string",
            age: "int?",
        },        
    }
}

const realmConfig = {
  schema: [Dog, Person,],
  inMemory: true,   
}

const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(realmConfig);

let assertionRealm: Realm;

describe("Create Data Tests", () => {
    beforeEach(async() => {
        // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
        assertionRealm = await Realm.open(realmConfig)

        // delete every object in the realmConfig in the Realm to make test idempotent
        assertionRealm.write(()=> {
            assertionRealm.delete(assertionRealm.objects("Dog"));
            assertionRealm.delete(assertionRealm.objects("Person"));
        })
    })
    it("should create a new object", async () => {        
        const wrapper = ({ children }: { children: React.ReactNode }) => <RealmProvider>{children}</RealmProvider>;

        // :snippet-start: crud-create-object
        // :replace-start: {
        //  "terms": {
        //   " testID='handleAddItemBtn'": ""
        //   }
        // }
        const CreateDogInput = () => {
            const [dogName, onChangeDogName] = React.useState('Fido');
            const realm = useRealm();

            const handleAddItem = () => {
                realm.write(() => {
                    new Dog(realm, {  name: dogName, age: 1, })
                });
            }

            return (
                <>
                    <TextInput onChangeText={onChangeDogName} value={dogName} />
                    <Button onPress={() => handleAddItem()} title="Submit Item" testID='handleAddItemBtn'/>
                </>
            )
        }
        // :replace-end:
        // :snippet-end:

        // render an App component, giving the CreateDogInput component access to the @realm/react hooks:
        const App = () => <RealmProvider> <CreateDogInput /></RealmProvider>
        const { getByTestId } = render(<App />);

        // press the "Submit Item" button
        const handleAddItemBtn = await waitFor(() => getByTestId("handleAddItemBtn"));
        await act(async () => {
            fireEvent.press(handleAddItemBtn);
        });

        // check if the new Dog object has been created
        const myDog = assertionRealm.objects("Dog").filtered("name == 'Fido'")[0]
        expect(myDog.name).toBe('Fido');
        expect(myDog.age).toBe(1);
    })

})

