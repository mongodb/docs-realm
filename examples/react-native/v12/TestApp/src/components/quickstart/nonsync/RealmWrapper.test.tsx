import 'react-native';
import React from 'react';
import {BSON} from 'realm';
import {AppWrapper} from './RealmWrapper';
import {render, screen, userEvent, within} from '@testing-library/react-native';

describe('Quick Start minimum viable app', () => {
  test('CRUD', async () => {
    render(<AppWrapper />);

    const user = userEvent.setup();

    const createInput = await screen.findByTestId('create-input');
    const createProfileButton = await screen.findByTestId('create-profile');

    const removeButton = await screen.findByTestId('remove-all-objects');

    // Clear any existing realm objects
    await user.press(removeButton);

    // Create test objects
    await user.type(createInput, 'Book Worm');
    await user.press(createProfileButton);
    await user.clear(createInput);
    await user.type(createInput, 'testProfile');
    await user.press(createProfileButton);
    await user.clear(createInput);

    // Get profile lists
    const allProfilesList = await screen.findByTestId('all-profiles');
    expect(allProfilesList.children.length).toBeGreaterThan(0);

    const sortedProfiles = await screen.findAllByTestId('sorted-profile');
    expect(sortedProfiles.length).toBeGreaterThan(0);
    // First profile in list should be "Book Worm"
    expect(sortedProfiles[0].children[1]).toBe('Book Worm');

    const filteredProfiles = await screen.findAllByTestId('filtered-profile');
    // Should only be one profile
    expect(filteredProfiles.length).toEqual(1);
    // Profile should match "testProfile"
    expect(filteredProfiles[0].children[1]).toBe('testProfile');

    const profilesToUpdate = await screen.findAllByTestId('profile-to-update');
    expect(profilesToUpdate.length).toBeGreaterThan(0);

    // Select first profile in list to update.
    await user.press(profilesToUpdate[0]);

    // Update object. Requires a selected profile to update
    const updateInput = await screen.findByTestId('update-input');
    const updateProfileButton = await screen.findByTestId('update-profile');

    await user.type(updateInput, 'test2');
    await user.press(updateProfileButton);
    await user.clear(updateInput);

    // Get list of profiles again
    const refreshedProfilesToUpdate =
      await screen.findAllByTestId('profile-to-update');

    // Check that first profile inlist has been updated.
    expect(refreshedProfilesToUpdate[0].children[0]).toBe('test2');

    const profilesToDelete = await screen.findAllByTestId('profile-to-delete');
    expect(profilesToDelete.length).toBeGreaterThan(0);
    const deleteProfileButton = await screen.findByTestId('delete-profile');

    // Select first profile in list to delete.
    await user.press(profilesToDelete[0]);
    // Delete object. Requires a selected profile to delete
    await user.press(deleteProfileButton);

    const refreshedProfilesToDelete =
      await screen.findAllByTestId('profile-to-delete');
    expect(refreshedProfilesToDelete.length).toBeLessThan(
      profilesToDelete.length,
    );

    // Clean up
    await user.press(removeButton);
  });
});
