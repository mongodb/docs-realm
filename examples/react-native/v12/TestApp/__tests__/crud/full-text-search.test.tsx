import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {FtsQuery} from './FtsQuery'; //how to get file path

describe('Full text search query',  () => {

  test('FTS query', async() => {
    // render the query component
    render(<FtsQuery />);

    // check the screen fro results of query
    const checkTheBooks = await screen.findByText('Books with \'the\'', {
      exact: false,
    });
    expect(checkTheBooks.children[1]).toBe('2');

    // NOW I NEED TO TEST

  });


});

// also where is the api for filtered? under results
