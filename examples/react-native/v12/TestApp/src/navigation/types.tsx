import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Geospatial: undefined;
  ObjectModels: undefined;
  Logger: undefined;
  Subscriptions: undefined;
  SubscribeApi: undefined;
  FullTextSearch: undefined;
  Relationships: undefined;
  Errors: undefined;
  QuickStart: undefined;
  QuickStart2: undefined;
  QuickStartSync: undefined;
};

export type SubscriptionStackParamList = {
  SubscriptionHome: undefined;
  SubscribeApi: undefined;
};

export type QuickStartStackParamList = {
  QuickStartHome: undefined;
  QuickStartLocal: undefined;
  QuickStartSync: undefined; 
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  DrawerScreenProps<RootStackParamList, T>;

export type LoggerScreenProps = DrawerScreenProps<RootStackParamList, 'Logger'>;
export type SubscriptionHomeProps = StackScreenProps<
  SubscriptionStackParamList,
  'SubscriptionHome'
>;
export type QuickStartHomeProps = StackScreenProps< QuickStartStackParamList, 'QuickStartHome'>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
