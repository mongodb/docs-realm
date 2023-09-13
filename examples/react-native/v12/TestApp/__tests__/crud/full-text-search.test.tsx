import React from 'react';
import {render, screen, waitFor, userEvent} from '@testing-library/react-native';
import {FtsQuery} from '../../src/components/FtsQuery'; //how to get file path

describe('Full text search query',  () => {

  test('FTS query', async() => {
    
    // render the query component
    render(<FtsQuery />);
    
    const user = userEvent.setup();
    const bookNameNode = await screen.findByTestId('bookNameInput');
    await user.type(bookNameNode, 'The Hunger Games');

    // get button and press button


    // check the screen for results of query
    const checkTheBooks = await screen.findByTestId('bookNameInput');
    expect(checkTheBooks.children[1]).toBe('2');

    // NOW I NEED TO TEST

  });


});

// also where is the api for filtered? under results
