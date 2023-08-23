import React, {PropsWithChildren} from 'react';
import {RealmProvider} from '@realm/react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {GeoSpatial} from './src/components/data-types/geospatial';

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

type SubSectionProps = {
  title: string;
};

function SubSection(props: PropsWithChildren<SubSectionProps>): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text>{props.title}</Text>
      <View>{props.children}</View>
    </View>
  );
}

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <RealmProvider>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>Welcome to the Realm React Native SDK test app!</Text>
          <View>
            <Section category="Data Types">
              <SubSection title="Geospatial">
                <GeoSpatial />
              </SubSection>
            </Section>
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
  // :emphasize-start:
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  // :emphasize-end:
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
