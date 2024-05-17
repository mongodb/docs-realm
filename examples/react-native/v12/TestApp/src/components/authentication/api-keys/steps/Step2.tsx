import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useUser} from '@realm/react';
import {ApiKey} from 'realm/dist/bundle';

import {StepProps} from '../../../types';

export const Step2 = ({currentStep, apiKey, setApiKey}: StepProps) => {
  const user = useUser();

  const [cloudApiKey, setCloudApiKey] = useState<ApiKey | undefined>();
  const [cloudKeyDeleted, setCloudKeyDeleted] = useState(false);

  const deleteUserApiKey = async () => {
    await user!.apiKeys.delete(cloudApiKey!._id);

    setApiKey(undefined);
    setCloudApiKey(undefined);
    setCloudKeyDeleted(true);
  };

  const disableUserApiKey = async () => {
    await user!.apiKeys.disable(cloudApiKey!._id);

    await getUserApiKey();
  };

  const enableUserApiKey = async () => {
    await user!.apiKeys.enable(cloudApiKey!._id);

    await getUserApiKey();
  };

  const getUserApiKey = async () => {
    const key = await user!.apiKeys.fetch(apiKey!._id);

    setCloudApiKey(key);
  };

  if (cloudKeyDeleted) {
    return <Text testID="delete-result">API key successfully deleted!</Text>;
  } else {
    return (
      <View>
        <Text>Step {currentStep + 1}: Manage a user API key</Text>

        {cloudApiKey ? (
          <View>
            <Text>Current API key</Text>
            <Text testID="get-result">
              • Identifying info: {cloudApiKey.name} | {cloudApiKey._id}
            </Text>
            <Text testID="disable-result">
              • Status: {cloudApiKey.disabled ? 'disabled' : 'enabled'}
            </Text>

            <View style={styles.buttonGroup}>
              <Pressable
                testID="disable-button"
                style={styles.button}
                onPress={disableUserApiKey}>
                <Text style={styles.buttonText}>Disable key</Text>
              </Pressable>
              <Pressable
                testID="enable-button"
                style={styles.button}
                onPress={enableUserApiKey}>
                <Text style={styles.buttonText}>Enable key</Text>
              </Pressable>
              <Pressable
                testID="delete-button"
                style={styles.button}
                onPress={deleteUserApiKey}>
                <Text style={styles.buttonText}>Delete key</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View>
            <Text>Get API key</Text>
            <Pressable
              testID="get-button"
              style={styles.button}
              onPress={getUserApiKey}>
              <Text style={styles.buttonText}>Get key</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  section: {
    flex: 1,
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#C5CAE9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
  },
  inputGroup: {
    width: '100%',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3F51B5',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: '#F3A6C2',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ffffff',
    opacity: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});
