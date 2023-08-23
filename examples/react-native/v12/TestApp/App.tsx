import React, {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Geospatial} from './src/components/data-types/Geospatial';

type SectionProps = {
  category: string;
};

function Section(props: PropsWithChildren<SectionProps>): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text>{props.category}</Text>
      <View>{props.children}</View>
    </View>
  );
}

function SubSection(props: PropsWithChildren): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <View>{props.children}</View>
    </View>
  );
}

// TODO: Create sync realm function
function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Welcome to the Realm React Native SDK test app!</Text>
        <View>
          <Section category="Data Types">
            <SubSection>
              <Geospatial />
            </SubSection>
          </Section>
        </View>
      </ScrollView>
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
