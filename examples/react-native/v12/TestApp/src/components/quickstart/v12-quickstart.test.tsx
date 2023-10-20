import 'react-native';
import React from 'react';
import { FindSortFilter } from './Filter';
import {render, screen, userEvent} from '@testing-library/react-native';
import { QuickStartLocal } from './RealmWrapperLocal';

describe('Quick Start tests', () => {
    beforeEach(async () => {
      // Close and remove all realms in the default directory.
      Realm.clearTestState();
    });

    test('Local tests', async () => {
        render(<QuickStartLocal />);
    });
});