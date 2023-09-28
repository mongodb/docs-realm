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
  Errors: undefined;
};

export type SubscriptionStackParamList = {
  SubscriptionHome: undefined;
  SubscribeApi: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  DrawerScreenProps<RootStackParamList, T>;

export type LoggerScreenProps = DrawerScreenProps<RootStackParamList, 'Logger'>;
export type SubscriptionHomeProps = StackScreenProps<
  SubscriptionStackParamList,
  'SubscriptionHome'
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
