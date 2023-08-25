import React from 'react';
import {View, Text, InteractionManagerStatic} from 'react-native';
import Realm, {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {RealmProvider, useRealm, useQuery} from '@realm/react';
import {useEffect} from 'react';

// :snippet-start: rn-fts-annotation
class Book extends Realm.Object {
  name!: string;
  price?: number;

  static schema: ObjectSchema = {
    name: 'Book',
    properties: {
      name: {type: 'string', indexed: 'full-text'},
      price: 'int?',
    },
  };
}
// :snippet-end:

describe('Full text search query',  () => {

  test('FTS query', async() => {

    <RealmProvider schema={[Book]}>

      <FtsQuery />
      
    </RealmProvider>

    // create component to test fts
    function FtsQuery(): JSX.Element {

      const realm = useRealm();

      // function to create books
      const writeBooks = (bookName: string, price: number) => {
        realm.write(() => {
          realm.create('Book', {
            name: bookName,
            price: price,
          });
        });
      };

      // create the books
      writeBooks("The Hunger Games", 10.99);
      writeBooks("Lord of the Rings", 21.99);
      writeBooks("Dune", 16.99);

      // then query on them
      // get the book objects
      const books = realm.objects("Book");
      // fts query the books
      const booksWithThe = books.filtered("name TEXT \$0", ["the"]);

      // Return the number of books in query
      return (
        <View>
          <Text> Books with 'the': {booksWithThe.length} </Text>
        </View>
      )

    }

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

// also where is the api for filtered?
