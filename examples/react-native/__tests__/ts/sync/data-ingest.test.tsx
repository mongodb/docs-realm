// :snippet-start: data-ingest-object
import React, { useEffect } from 'react';
import Realm from 'realm';
import {AppProvider, UserProvider, createRealmContext, useApp, useUser} from '@realm/react';
import { Button } from 'react-native';
// :remove-start:
import {render, fireEvent, act} from '@testing-library/react-native';

const app = new Realm.App({ id: "js-flexible-oseso" });
const weatherSensorPrimaryKey = new Realm.BSON.ObjectId();
const APP_ID = 'js-flexible-oseso';

let sensors;
// :remove-end:

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
// :snippet-end:

// :snippet-start: anonymous-login
// Connect & Authenticate with an App Services App
function LogIn() {
    const app = useApp();
  
    useEffect(() => {
      app.logIn(Realm.Credentials.anonymous());
    }, []);
  
    return <></>;
}
// :snippet-end:

// :snippet-start: open-realm
// Open a Realm 

// Create a configuration object
const realmConfig: Realm.Configuration = {
    schema: [WeatherSensor],
  };
  
// Create a realm context
const {RealmProvider, useRealm, useObject, useQuery} =
createRealmContext(realmConfig);
  
// Expose a sync realm
function AppWrapperSync() {
    return (
        <AppProvider id={APP_ID}>
            <UserProvider fallback={LogIn}>
                <RealmProvider
                    sync={{
                        flexible: true,
                        onError: console.error
                    }}>
                    <App />
                </RealmProvider>
            </UserProvider>
        </AppProvider>
    );
}
// :snippet-end:

// :snippet-start: write-data-ingest-object
// Create Asymmetric Objects
const App = () => {
    // Getting access to our opened realm instance
    const realm = useRealm(); 

    const handleAddSensor = () => {
        realm.write(() => {
            realm.create('WeatherSensor', {
                _id: weatherSensorPrimaryKey,
                deviceId: "WX1278UIT",
                temperatureInFahrenheit: 66.7,
                barometricPressureInHg: 29.65,
                windSpeedInMph: 2,
            });
        });
    }

    return (
        <Button
            title='Add A New Sensor'
            onPress={() => handleAddSensor()}
            testID='handleAddSensorBtn' // :remove:
        />
    )
};
// :snippet-end:

describe('Sync Data Unidirectionally from a Client App', () => {

    beforeAll(async () => {
        // Close and remove all realms in the default directory.
        Realm.clearTestState();

        const credentials = Realm.Credentials.anonymous();
        await app.logIn(credentials);
    });
    
    afterAll(async () => {
        app.currentUser?.logOut;
    });

    test('Create an Asymmetric Object', async () => {
        const {findByTestId} = render(<AppWrapperSync />);

        // get the Add Sensor button 
        const handleAddSensorBtn = await findByTestId('handleAddSensorBtn');

        // press the Add Sensor button 
        await act(() => {
            fireEvent.press(handleAddSensorBtn);
        })

        // Access linked MongoDB collection
        const mongodb = app.currentUser?.mongoClient('mongodb-atlas');
        sensors = mongodb!.db('JSFlexibleSyncDB').collection<WeatherSensor>('WeatherSensor');

        // check if the new Sensor object has been created
        const newSensor = await sensors.findOne({_id: weatherSensorPrimaryKey});
        expect(newSensor?._id).toEqual(weatherSensorPrimaryKey);
        expect(newSensor!.deviceId).toBe("WX1278UIT");

        // clean up all documents and ensure they are deleted
        await sensors.deleteMany({
            deviceId: "WX1278UIT",
          });
      
        const numberOfWeatherSensorDocuments = await sensors.count();
        expect(numberOfWeatherSensorDocuments).toBe(0);
    });
});