import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {AppProvider, UserProvider, useUser} from '@realm/react';

import {LoginManager} from './LoginManager';
import {ManageApiKeys} from './ManageApiKeys';

import {APP_ID} from '../../../../appServicesConfig';

export const ApiKeyAuth = () => {
  const [apiKeyKey, setApiKeyKey] = useState('');
  const [apiKeyId, setApiKeyId] = useState('');
  const testUser = {
    email: 'test-rn-api-key@example.com',
    password: 'abc123',
  };

  return (
    <AppProvider id={APP_ID}>
      <LoginManager
        email={testUser.email}
        password={testUser.password}
        apiKey={apiKeyKey}
      />
      <UserProvider>
        <ManageApiKeys
          apiKeyId={apiKeyId}
          setApiKeyId={setApiKeyId}
          setApiKeyKey={setApiKeyKey}
        />
        <RestOfApp />
      </UserProvider>
    </AppProvider>
  );
};

function RestOfApp() {
  const user = useUser();
  // Proceed to app logic...
  // :remove-start:
  return (
    <View>
      <Text testID="logged-in-user-id">
        Logged in as user with ID: {user.id}
      </Text>
    </View>
  );
  // :remove-end:
}
