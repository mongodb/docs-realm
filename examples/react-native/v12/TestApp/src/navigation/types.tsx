import {DrawerScreenProps} from '@react-navigation/drawer';

type Log = {
  message: string;
  level: string;
};

export type RootStackParamList = {
  Home: undefined;
  Geospatial: undefined;
  Logger: {logs: Log[]};
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  DrawerScreenProps<RootStackParamList, T>;

export type LoggerScreenProps = DrawerScreenProps<RootStackParamList, 'Logger'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
