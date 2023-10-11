import 'react-native';
import React from 'react';
import {BSON} from 'realm';
import {LoginExample} from './RealmWrapper';
import {render, screen, userEvent, within} from '@testing-library/react-native';

describe('Log in with App Services auth providers', () => {
  // Make sure the same user isn't persisted across tests.
  beforeEach(async () => {
    render(<LoginExample />);

    const user = userEvent.setup();

    // Log user out
    const logOutButton = screen.queryByText('Log out', {
      exact: false,
    });

    if (logOutButton) {
      await user.press(logOutButton);
      await new Promise(r => setTimeout(r, 250));
    }

    // <Login> component should render because there's no auth'd user
    const newLoginAnonymousButton = await screen.findByTestId(
      'log-in-anonymous',
    );
    expect(newLoginAnonymousButton).toBeInTheDocument;
  });

  test('anonymous auth provider', async () => {
    render(<LoginExample />);

    const user = userEvent.setup();

    const loginAnonymousButton = await screen.findByTestId('log-in-anonymous');
    await user.press(loginAnonymousButton);

    // <UserInformation> component should render now that
    // user is logged in.
    const userStateNode = await screen.findByText('User state:', {
      exact: false,
    });
    expect(userStateNode.children[1]).toBe('LoggedIn');
  });

  test('email/password auth provider', async () => {
    render(<LoginExample />);

    // Set up user and user information
    const user = userEvent.setup();
    const userEmail = `${new BSON.UUID()}@example.com`;
    const userPassword = 'v3ryv3rySECRET';

    // Get interactive UI nodes
    const emailInput = await screen.findByTestId('email-input');
    const passwordInput = await screen.findByTestId('password-input');
    const registerButton = await screen.findByTestId('register-button');
    const logInButton = await screen.findByTestId('log-in');

    // Register user with email and password
    await user.type(emailInput, userEmail);
    await user.type(passwordInput, userPassword);
    await user.press(registerButton);

    // Use promise hack to wait for app services to
    // finish registration process. Can't await register
    // with new hooks. Essentially, delays the next part
    // of the test by 1 second.
    await new Promise(r => setTimeout(r, 500));

    // Log new user in
    await user.press(logInButton);

    // <UserInformation> component should render now that
    // user is logged in
    const userStateNode = await screen.findByText('User state:', {
      exact: false,
    });
    expect(userStateNode.children[1]).toBe('LoggedIn');

    const renderedUserEmail = await screen.findByText('Email:', {
      exact: false,
    });
    expect(renderedUserEmail.children[1]).toBe(userEmail);
  });

  test('send reset password email', async () => {
    render(<LoginExample />);

    // Set up user and user information
    const user = userEvent.setup();
    const userEmail = `${new BSON.UUID()}@example.com`;
    const userPassword = 'v3ryv3rySECRET';

    // Get interactive UI nodes
    const emailInput = await screen.findByTestId('email-input');
    const passwordInput = await screen.findByTestId('password-input');
    const registerButton = await screen.findByTestId('register-button');
    const sendResetPasswordEmailButton = await screen.findByTestId(
      'send-reset-email',
    );

    // Register user with email and password
    await user.type(emailInput, userEmail);
    await user.type(passwordInput, userPassword);
    await user.press(registerButton);

    // Check for successful registration
    const resultSuccessMessage = await screen.findByTestId(
      'result-success-message',
    );
    expect(resultSuccessMessage.children[0]).toBe('Successful auth operation!');

    // Send reset password email. This should fail, as the
    // backend isn't configured for it.
    user.press(sendResetPasswordEmailButton);

    // Match rendered error message with what we expect
    const renderedErrorMessage = await screen.findByTestId(
      'send-reset-email-error',
      {
        exact: false,
      },
    );

    expect(renderedErrorMessage.children[0]).toContain(
      'please use reset password via function',
    );
  });

  test('reset password', async () => {
    render(<LoginExample />);

    // Set up user and user information
    const user = userEvent.setup();
    const userEmail = `${new BSON.UUID()}@example.com`;
    const userPassword = 'v3ryv3rySECRET';
    const newPassword = 'superv3rySECRET';

    // Get interactive UI nodes
    const emailInput = await screen.findByTestId('email-input');
    const passwordInput = await screen.findByTestId('password-input');
    const registerButton = await screen.findByTestId('register-button');
    const resetPasswordButton = await screen.findByTestId('reset-password');

    // Register user with email and password
    await user.type(emailInput, userEmail);
    await user.type(passwordInput, userPassword);
    await user.press(registerButton);

    // Check for successful registration
    const resultSuccessMessage = await screen.findByTestId(
      'result-success-message',
    );
    expect(resultSuccessMessage.children[0]).toBe('Successful auth operation!');

    await user.type(passwordInput, newPassword);

    // Call `performResetPassword()`. The component has
    // fake `token` and `tokenId` values already. This
    // should fail, as the backend isn't configured for it.
    user.press(resetPasswordButton);

    // Match rendered error message with what we expect
    const renderedErrorMessage = await screen.findByTestId(
      'password-reset-error',
      {
        exact: false,
      },
    );

    expect(renderedErrorMessage.children[0]).toContain('invalid token data');
  });
});
