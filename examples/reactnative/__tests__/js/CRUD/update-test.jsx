import React, { useEffect } from "react";
import { Button, TextInput, Text } from "react-native";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import Realm from "realm";
import { createRealmContext } from '@realm/react'

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: crud-person-and-task-schema
class Person extends Realm.Object {
    static schema = {
        name: "Person",
        properties: {
            name: "string",
            age: "int?",
        },
    }
}
class Task extends Realm.Object {
    static schema = {
        name: "Task",
        properties: {
            _id: "int",
            name: "string",
            priority: "int?",
            progressMinutes: "int?",
            assignee: "Person?",
        },
        primaryKey: "_id",
    }
}
// :snippet-end:

const realmConfig = {
  schema: [Person, Task,],
  inMemory: true,
}

const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(realmConfig);

let assertionRealm;

describe("Update Data Tests", () => {
    beforeEach(async() => {
        // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
        assertionRealm = await Realm.open(realmConfig)

        // delete every object in the realmConfig in the Realm to make test idempotent
        assertionRealm.write(()=> {
            assertionRealm.delete(assertionRealm.objects("Person"));
            assertionRealm.delete(assertionRealm.objects("Task"));

            const nickObj = new Person(assertionRealm, { name: "Nick Jones", age: 74 })
            const calebObj = new Person(assertionRealm, { name: "Caleb", age: 5 })
            const kyleObj = new Person(assertionRealm, { name: "Kyle", age: 12 })

            const task1 = new Task(assertionRealm, { _id: 92140, priority: 4, progressMinutes: 0, assignee: nickObj, name: "Paint the walls" });
            const task2 = new Task(assertionRealm, { _id: 87432, priority: 2, progressMinutes: 0, assignee: calebObj, name: "Complete math homework" });
            const task3 = new Task(assertionRealm, { _id: 93479, priority: 2, progressMinutes: 30, assignee: calebObj, name: "Learn spanish" });

        })
        
        // const myP = assertionRealm.objects("Person").filtered("name == 'Nick Jones'");

        // console.log("Do my P exist::: ", myP.name)

    })
    afterAll(() => {
        if(!assertionRealm.isClosed){
            assertionRealm.close()
        }
    })
    it("should update an object", async () => {        
        // :snippet-start: crud-update-object
        // :replace-start: {
        //  "terms": {
        //   " testID='progressMinutes'": "",
        //   " testID='handleIncrementBtn'": ""
        //   }
        // }
        const TaskItem = ({ _id }) => {
            const realm = useRealm();
            const myTask = useObject("Task", _id);
            
            const incrementTask = () => {
                realm.write(() => {
                    myTask.progressMinutes += 1;
                })
            }
            return (
                <>
                    <Text>Task: {myTask.name}</Text>
                    <Text>Progress made (in minutes):</Text>
                    <Text testID='progressMinutes'>{myTask.progressMinutes}</Text>
                    <Button onPress={() => incrementTask()} title="Submit Item" testID='handleIncrementBtn'/>
                </>
            )
        }
        // :replace-end:
        // :snippet-end:

        // render an App component, giving the CreateDogInput component access to the @realm/react hooks:
        const App = () => <RealmProvider> <TaskItem _id={92140}/> </RealmProvider>
        const { getByTestId } = render(<App />);

        const handleIncrementBtn = await waitFor(() => getByTestId("handleIncrementBtn"));
        const progressMinutesText = await waitFor(() => getByTestId("progressMinutes"));

        const paintTask = assertionRealm.objectForPrimaryKey(Task, 92140);

        // Test that the initial progress value in the realm and in the UI is 0 minutes
        expect(paintTask.progressMinutes).toBe(0);
        expect(progressMinutesText.children.toString()).toBe("0");

        await act(async () => {
            fireEvent.press(handleIncrementBtn);
        });

        // Test that the  progress value in the realm and in the UI after incrementing is 1 minutes
        expect(paintTask.progressMinutes).toBe(1);
        expect(progressMinutesText.children.toString()).toBe("1");
    })

    it("should upsert an object", async () => {
        // :snippet-start: crud-upsert-object
        // :replace-start: {
        //  "terms": {
        //   " testID='progressMinutes'": ""
        //   }
        // }
        const CreateTaskItem = () => {
            const realm = useRealm();

            let myTask;
            realm.write(() => {
                // Add a new person to the realm. Since nobody with ID 1234
                // has been added yet, this adds the instance to the realm.
                myTask = realm.create( "Task", { _id: 1234, name: "Wash the car", progressMinutes: 0}, "modified");

                // If an object exists, setting the third parameter (`updateMode`) to
                // "modified" only updates properties that have changed, resulting in
                // faster operations.
                myTask = realm.create( "Task", { _id: 1234, name: "Wash the car", progressMinutes: 5}, "modified");     
            })
            return(
                <>
                    <Text>{myTask.name}</Text>
                    <Text>Progress made (in minutes):</Text>
                    <Text testID='progressMinutes'>{myTask.progressMinutes}</Text>
                </>
            )
        }
        // :replace-end:
        // :snippet-end:

        const App = () => <RealmProvider> <CreateTaskItem /> </RealmProvider>
        const { getByTestId } = render(<App />);

        const progressMinutesText = await waitFor(() => getByTestId("progressMinutes"));
        const carWashTask = assertionRealm.objectForPrimaryKey(Task, 1234);

        // Test that the the 'Wash the car' task was upserted, and progressMinutesText is now displaying 5 minutes progressed
        expect(progressMinutesText.children.toString()).toBe("5");
        expect(carWashTask.progressMinutes).toBe(5)
    })

    it("should bulk update an object", async () => {
        // :snippet-start: crud-bulk-update
        // :replace-start: {
        //  "terms": {
        //   " testID='resetProgressOnAllTasksBtn'": ""
        //   }
        // }
        const TaskDashboard = () => {
            const realm = useRealm();
            const tasks = useQuery("Task");

            const resetProgressOnAllTasks = () => {
                console.log('Reset Progress')
                realm.write(() => {
                    for(const task of tasks){
                        task.progressMinutes = 0;
                    }
                })
            }
            return (
            <>
                {
                    tasks.map((task) => {
                        <Text>{task.name} has {task.progressMinutes} minutes progressed</Text>
                    })
                }
                <Button onPress={resetProgressOnAllTasks} title="Reset Progress" testID="resetProgressOnAllTasksBtn"/>
            </>
            )
        }
        // :replace-end:
        // :snippet-end:    

        const App = () => <RealmProvider> <TaskDashboard /> </RealmProvider>
        const { getByTestId } = render(<App />);

        const resetProgressOnAllTasksBtn = await waitFor(() => getByTestId("resetProgressOnAllTasksBtn"));

        await act(async () => {
            fireEvent.press(resetProgressOnAllTasksBtn);
        });

        // Test that the resetProgressOnAllTasks() method has been called and all Task objects have been bulk updated
        const tasks = assertionRealm.objects("Task");
        for(const task of tasks){
            expect(task.progressMinutes).toBe(0);
        }
    })

})