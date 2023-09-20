import React, {useEffect, useState} from 'react';
import {
  Credentials,
  CompensatingWriteError,
  CompensatingWriteInfo,
  ErrorCallback,
} from 'realm';
import {AppProvider, UserProvider, RealmProvider, useApp} from '@realm/react';

import {CompensatingWriteErrorRenderer} from './CompensatingWriteErrorRenderer';

import {Person, Turtle} from '../../models';

import {APP_ID} from '../../../appServicesConfig';

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous());
  }, []);

  return <></>;
}

export const CompensatingWriteErrorHandling = () => {
  const [error, setError] = useState<CompensatingWriteError | undefined>(
    undefined,
  );
  const [compensatingWrites, setCompensatingWrites] = useState<
    CompensatingWriteInfo[] | undefined
  >(undefined);

  const errorCallback: ErrorCallback = (session, error) => {
    // Check if error type matches CompensatingWriteError.
    if (error instanceof CompensatingWriteError) {
      // Handle the compensating write error as needed.
      setError(error);

      setCompensatingWrites(error.writes);
    }
  };

  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[Person, Turtle]}
          sync={{
            flexible: true,
            onError: errorCallback,
          }}>
          <CompensatingWriteErrorRenderer
            error={error}
            compensatingWrites={compensatingWrites}
          />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};
