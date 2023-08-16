import React, {useState, useEffect} from 'react';
import {RealmProvider, useRealm} from '@realm/react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

// :snippet-start: snippet-name
function Section(): JSX.Element {
  const realm = useRealm();
  const [realmState, setRealmState] = useState('closed');
  console.debug('Realm status:', realm.isClosed ? 'closed' : 'open');

  useEffect(() => {
    setRealmState(realm.isClosed ? 'closed' : 'open'); // :emphasize:
  }, [realm.isClosed]);

  return (
    <View style={styles.sectionContainer}>
      <Text>Realm status: {realmState}</Text>
    </View>
  );
}
// :snippet-end:

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <RealmProvider>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section />
          </View>
        </ScrollView>
      </RealmProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
