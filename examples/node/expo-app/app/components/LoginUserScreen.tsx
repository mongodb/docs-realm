
import { Text, } from "react-native";
import React, {useEffect } from 'react';
import {appId} from "../../realm.json";

const app = new Realm.App({ id: appId });

const LoginUserScreen = () => {
    useEffect(() => {
        const LogInAnonymous = async() => await app.logIn(Realm.Credentials.anonymous());
    }, [app]);
    return(
        <Text>Mock Login Screen</Text>
    )
}

export default LoginUserScreen;