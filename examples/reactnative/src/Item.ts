import React, { useState } from "react";
import { Realm, createRealmContext } from '@realm/react'

export class Item extends Realm.Object {
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
export default createRealmContext({
    schema: [Item],
    deleteRealmIfMigrationNeeded: true,
});