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

// open a new realm
<RealmProvider schema={[Book]}>

      <FtsQuery />
      
    </RealmProvider>

// create component to test fts
export function FtsQuery(): JSX.Element {

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
    const books = useQuery(Book);
    // fts query the books
    const booksWithHunger = books.filtered("name TEXT \$0", ["hunger"]);

    // books without 'the'
    const booksWithoutThe = books.filtered("name TEXT \$0", ["the"]);


    // Return the number of books in query
    return (
      <View>
        <Text> Books without 'the': {booksWithoutThe.length} </Text>
        <Text> Books with 'hunger': {booksWithHunger.length} </Text>
      </View>
    )

}