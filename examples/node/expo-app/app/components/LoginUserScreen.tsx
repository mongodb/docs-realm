
import { StyleSheet, View, Text, Button } from "react-native";
import React, {useEffect } from 'react';
import {appId} from "../../realm.json";
import AppWrapper from "../../AppWrapper";

const app = new Realm.App({ id: appId });

const LoginUserScreen = () => {
    const onPressLogin = async() => {
        await app.logIn(Realm.Credentials.anonymous());
        alert(app.currentUser.id)
    }
    return(
        <View style={styles.loginWrapper}>
            <Text style={styles.loginTextTitle}>Mock Login Screen</Text>
            <Button title="Login" onPress={() => onPressLogin()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    loginWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    loginTextTitle: {
        textAlign: 'center'
    }
  });
  

export default LoginUserScreen;