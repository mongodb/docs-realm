import {DrawerScreenProps} from '@react-navigation/drawer';

export type RootStackParamList = {
  Home: undefined;
  Geospatial: undefined;
  ObjectModels: undefined;
  Logger: undefined;
  Subscriptions: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  DrawerScreenProps<RootStackParamList, T>;

export type LoggerScreenProps = DrawerScreenProps<RootStackParamList, 'Logger'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
