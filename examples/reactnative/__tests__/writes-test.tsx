// import realm stuff
import Realm, { User, } from "realm";
import React, { useRef, useState } from "react";

import { createRealmContext } from '@realm/react'

// const createRealmContext = require("../src/createRealmContext")
// import the hook 
import useCounter from "../src/useCounter";

// import testing lib
// import { render, fireEvent, waitFor, renderHook, act } from "@testing-library/react-native";

// import {act, renderHook, WaitFor} from '@testing-library/react-hooks'; // act = to perform actions like increment() ; renderHook = renders our hook

import { render, fireEvent, waitFor, renderHook, act } from "@testing-library/react-native";

import { View, Button, Text } from "react-native";



const dogSchema: Realm.ObjectSchema = {
  name: "dog",
  primaryKey: "_id",
  properties: {
    _id: "int",
    name: "string",
  },
};


const { RealmProvider, useRealm } = createRealmContext({
  schema: [dogSchema],
  inMemory: true,
});

describe("write transactions", () => {
    it("should create a realm object", async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => <RealmProvider>{children}</RealmProvider>;

        const { result, unmount } = renderHook(() => useRealm(), { wrapper });

        await waitFor(() => expect(result.current).not.toBe(null));

        console.log('current', result.current);

        // wait for the realm to load
        // console.log('waitFor', waitFor)

        // setTimeout(() => {
        //     console.log('current', result.current);

        // }, 5000)

        // await waitFor(() => expect(1).toBe(1))  // expect(result.current).not.toBe(null));

        // const realm = result.current;
        // expect(realm).not.toBe(null);
        // expect(realm.schema[0].name).toBe("dog");

    })

    it("sample write", () => {
        const RealmComponent = () => {
            const realm = useRealm();
            return <Text testID="schemaName">{realm.schema[0].name}</Text>;
        };


        const App = () => {
          const [schema, setSchema] = useState(dogSchema);
          return (
            <>
              <View testID="firstRealmProvider">
                <RealmProvider schema={[schema]}>
                  <RealmComponent />
                </RealmProvider>
              </View>
              <Button testID="changeSchema" title="change schema" onPress={() => setSchema(catSchema)} />
            </>
          );
        };

    })

    it.skip("write transaction", async () => {
        const RealmComponent = () => {
        const realm = useRealm();
        return (
            <Button
            testID="action"
            title="create-dog"
            onPress={() =>
                realm.write(() => {
                realm.create("dog", { _id: new Date().getTime(), name: "Rex" });
                })
            }
            />
        );
        };

        const App = () => {
        return (
            <>
                <View testID="firstRealmProvider">
                    <RealmProvider>
                        <RealmComponent />
                    </RealmProvider>
                </View>
            </>
        );
        };
        const { getByTestId } = render(<App />);
        const btnComponent = getByTestId("action");

        await act(async () => {
            fireEvent.press(btnComponent);
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // const { getByTestId } = render(<RealmComponent />);
        // expect(getByTestId).not.toBeEmptyElement();


    })

    it("my writes ---", async () => {
    const RealmComponent = () => {
      const realm = useRealm();
      realm.write(() => {
        realm.create("dog", { _id: new Date().getTime(), name: "Rex 0" });
      })

      console.log('sample', realm.objects("dog").filtered("name == 'Rex 0'")[0].name);

      return (
        <Button
          testID="action"
          title="toggle"
          onPress={() =>
            realm.write(() => {
              realm.create("dog", { _id: new Date().getTime(), name: "Rex" });
            })
          }
        />
      );
    };
    const App = () => {
      const [toggleComponent, setToggleComponent] = useState(true);
      return (
        <>
          <View testID="firstRealmProvider">
            <RealmProvider>
              <RealmComponent />
            </RealmProvider>
          </View>
          <Button testID="toggle" title="toggle" onPress={() => setToggleComponent(!toggleComponent)} />
        </>
      );
    };
    const { getByTestId } = render(<App />);
    const toggleComponent = getByTestId("toggle");
    const actionComponent = await waitFor(() => getByTestId("action"));


    await act(async () => {
      fireEvent.press(toggleComponent);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // const realm = useRealm();
    // console.log('sample', realm.objects("dog").filtered("name == 'Rex 0'")[0]);


    // await act(async () => {
    //   expect(() => fireEvent.press(actionComponent)).toThrow("Cannot access realm that has been closed.");
    // });

  });



    it("can be provided in multiple parts of an application", async () => {
    const RealmComponent = () => {
      const realm = useRealm();
      return (
        <Button
          testID="action"
          title="toggle"
          onPress={() =>
            realm.write(() => {
              realm.create("dog", { _id: new Date().getTime(), name: "Rex" });
            })
          }
        />
      );
    };
    const App = () => {
      const [toggleComponent, setToggleComponent] = useState(true);
      return (
        <>
          <View testID="firstRealmProvider">
            <RealmProvider>
              <RealmComponent />
            </RealmProvider>
          </View>
          {toggleComponent && (
            <View testID="secondRealmProvider">
              <RealmProvider>
                <View />
              </RealmProvider>
            </View>
          )}
          <Button testID="toggle" title="toggle" onPress={() => setToggleComponent(!toggleComponent)} />
        </>
      );
    };
    const { getByTestId } = render(<App />);
    const secondRealmProvider = getByTestId("secondRealmProvider");
    const toggleComponent = getByTestId("toggle");
    const actionComponent = await waitFor(() => getByTestId("action"));

    expect(secondRealmProvider).not.toBeEmptyElement();

    await act(async () => {
      fireEvent.press(toggleComponent);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(() => getByTestId("secondRealmProvider")).toThrow(
      "Unable to find an element with testID: secondRealmProvider",
    );

    // This is actually a bug that we need to fix on a deeper level
    await act(async () => {
      expect(() => fireEvent.press(actionComponent)).toThrow("Cannot access realm that has been closed.");
    });
  });

    

})


