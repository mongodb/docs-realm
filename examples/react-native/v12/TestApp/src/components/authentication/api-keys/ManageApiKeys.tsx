import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import {useUser} from '@realm/react';

import {ApiKey} from 'realm/dist/bundle';

interface ManageApiKeysProps {
  setApiKeyKey: React.Dispatch<React.SetStateAction<string>>;
  setApiKeyId: React.Dispatch<React.SetStateAction<string>>;
  apiKeyId: string;
}

export const ManageApiKeys = ({
  setApiKeyKey,
  setApiKeyId,
  apiKeyId,
}: ManageApiKeysProps) => {
  const user = useUser();

  const [apiKeyName, setApiKeyName] = useState('');
  const [allKeys, setAllKeys] = useState<ApiKey[]>([]);

  // This useEffect runs once every time the component is rendered. Deletes all
  // existing api keys for the current user.
  useEffect(() => {
    deleteAllApiKeys();
  }, []);

  const deleteAllApiKeys = async () => {
    // List all existing keys
    const keysBefore = await user.apiKeys.fetchAll();
    // Delete any existing keys
    for (const key of keysBefore) {
      await user.apiKeys.delete(key._id);
    }
  };

  async function createUserApiKey() {
    const {_id, key, name, disabled} = await user?.apiKeys.create(apiKeyName);

    // ...Do something with API key like save it
    // or share it with external service that authenticates
    // on user's behalf.
    // :remove-start:
    setApiKeyId(_id);
    setApiKeyKey(key);

    const keys = await user.apiKeys.fetchAll();
    setAllKeys(keys);
    // :remove-end:
  }

  async function fetchUserApiKey() {
    // List all of a user's keys
    const keys = await user.apiKeys.fetchAll();
    // Get a specific key by its ID
    const key = await user.apiKeys.fetch(apiKeyId);

    setAllKeys(keys);
  }

  async function disableUserApiKey() {
    // Get the user's API key
    const keys = await user.apiKeys.fetchAll();
    const keyId = keys[0]['_id'];

    // Disable the User API Key
    await user.apiKeys.disable(keyId);
  }

  async function enableUserApiKey() {
    // Get the user's API key
    const keys = await user.apiKeys.fetchAll();
    const keyId = keys[0]['_id'];

    // Enable the User API Key
    await user.apiKeys.enable(keyId);
  }

  async function deleteUserApiKey() {
    // Get the user's API key
    const keys = await user.apiKeys.fetchAll();
    const keyId = keys[0]['_id'];

    // Delete the User API Key
    await user.apiKeys.delete(keyId);
    setApiKeyKey('');
  }

  // :remove-start:
  return (
    <View style={styles.section}>
      <Text>Create a new API key</Text>
      <TextInput
        testID={'api-key-name'}
        onChangeText={setApiKeyName}
        value={apiKeyName}
        placeholder="API key name"
        style={styles.textInput}
      />
      <Pressable
        style={styles.button}
        onPress={createUserApiKey}>
        <Text style={styles.buttonText}>Create key</Text>
      </Pressable>

      <View style={styles.section}>
        <Text>Manage this user's API keys: </Text>
        <View style={styles.buttonGroup}>
          <Pressable
            style={styles.button}
            onPress={fetchUserApiKey}>
            <Text style={styles.buttonText}>Fetch key</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={disableUserApiKey}>
            <Text style={styles.buttonText}>Disable key</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={enableUserApiKey}>
            <Text style={styles.buttonText}>Enable key</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={deleteUserApiKey}>
            <Text style={styles.buttonText}>Delete key</Text>
          </Pressable>
        </View>
      </View>

      {allKeys && (
        <View style={styles.section}>
          <Text>Fetched API Keys: </Text>
          <FlatList
            scrollEnabled={false}
            data={allKeys}
            renderItem={({item}) => <Text testID="key"> • {item.name}</Text>}
            keyExtractor={item => item._id}
          />
        </View>
      )}
    </View>
  );
  // :remove-end:
};

const styles = StyleSheet.create({
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
