import React from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {useAuth} from './AuthProvider';
import {LogInView} from './LogInView';
import {TasksView} from './TasksView';
import {TasksProvider} from './TasksProvider';

// The AppBody is the main view within the App. If a user is not logged in, it
// renders the login view. Otherwise, it renders the tasks view. It must be
// within an AuthProvider.
export function AppBody() {
  const {user} = useAuth();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          {user == null ? (
            <LogInView />
          ) : (
            <TasksProvider projectId="My Project">
              <TasksView />
            </TasksProvider>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
