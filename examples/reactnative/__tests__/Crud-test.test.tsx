// imports
import React, { useRef, useState } from "react";
import Realm, { User } from "realm";
import "@testing-library/jest-native/extend-expect";
import { createRealmContext } from '@realm/react'

import { View, Button, Text } from "react-native";
import { render, fireEvent, waitFor, renderHook, act } from "@testing-library/react-native";

class Item extends Realm.Object {
  static generate(description) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      createdAt: new Date(),
    };
  }
  static schema = {
    name: 'Item',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      isComplete: { type: 'bool', default: false },
      createdAt: 'date'
    },
  };
}
const { useQuery, useObject, RealmProvider, useRealm } = createRealmContext({
    schema: [Item],
    deleteRealmIfMigrationNeeded: true,
});

const realm = useRealm();

describe("CRUD Tests", () => {
    test("test create object(s)", () => {

        realm.write(() => {
            let myItem: Realm.Object = realm.create("Item", Item.generate("go to the supermarket"));

            console.log(myItem)

        })
        // expect().toBe()
    })
})


// describe

// its > with renders