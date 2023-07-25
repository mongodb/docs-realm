import React, { useEffect } from 'react';
import Realm from 'realm';
import {AppProvider, UserProvider, createRealmContext, useApp, useUser} from '@realm/react';
import { Button } from 'react-native';

// Define an Asymmetric Object 
class WeatherSensor extends Realm.Object<WeatherSensor> {
    _id!: Realm.BSON.ObjectId;
    deviceId!: string;
    temperatureInFahrenheit!: number;
    barometricPressureInHg!: number;
    windSpeedInMph!: number;

    static schema = {
        name: 'WeatherSensor',
        // sync WeatherSensor objects one way from your device
        // to your Atlas database.
        asymmetric: true,
        primaryKey: '_id',
        properties: {
          _id: 'objectId',
          deviceId: 'string',
          temperatureInFahrenheit: 'int',
          barometricPressureInHg: 'float',
          windSpeedInMph: 'float',
        },
    };
}
