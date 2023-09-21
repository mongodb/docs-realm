import React, {useEffect, useState} from 'react';
import {Credentials, CompensatingWriteError, ErrorCallback} from 'realm';
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

  const errorCallback: ErrorCallback = (session, error) => {
    // Check if error type matches CompensatingWriteError.
    if (error instanceof CompensatingWriteError) {
      // Handle the compensating write error as needed.
      // console.debug({
      //   code: error.code,
      //   name: error.name,
      //   category: error.category,
      //   message: error.message,
      //   url: error.logUrl,
      //   writes: error.writes,
      // });

      setError(error);
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
          <CompensatingWriteErrorRenderer error={error} />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};
