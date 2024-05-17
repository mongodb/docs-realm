import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import {useUser} from '@realm/react';

import {StepProps} from '../../../types';

export const Step1 = ({currentStep, apiKey, setApiKey}: StepProps) => {
  const user = useUser();

  const [apiKeyName, setApiKeyName] = useState('');

  // This useEffect runs once every time the component is rendered. Deletes all
  // existing api keys for the current user.
  useEffect(() => {
    async function deleteAllApiKeys() {
      // List all existing keys
      const keys = await user.apiKeys.fetchAll();

      if (keys.length) {
        // Delete any existing keys
        for (const key of keys) {
          await user.apiKeys.delete(key._id);
        }
      }
    }

    deleteAllApiKeys();

    setApiKey(undefined);
  }, []);

  const createUserApiKey = async () => {
    const {_id, key, name, disabled} = await user?.apiKeys.create(apiKeyName);

    setApiKey({_id, key, name, disabled});
  };

  return (
    <View>
      <Text>Step {currentStep + 1}: Create a user API Key</Text>
      <View>
        {apiKey ? (
          <View>
            <Text>New API key created</Text>
            <Text testID="key-name-result">
              • {apiKey.name} | {apiKey._id}
            </Text>
          </View>
        ) : (
          <View>
            <TextInput
              testID={'key-name-input'}
              onChangeText={setApiKeyName}
              value={apiKeyName}
              placeholder="API key name"
              style={styles.textInput}
            />

            <View style={styles.buttonGroup}>
              <Pressable
                testID="create-key-button"
                style={
                  apiKey == undefined ? styles.button : styles.disabledButton
                }
                onPress={createUserApiKey}
                disabled={apiKey != undefined}>
                <Text style={styles.buttonText}>Create key</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
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
