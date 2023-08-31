import React, {useState} from 'react';
import Realm, {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {RealmProvider, useRealm, useQuery} from '@realm/react';
import {useEffect} from 'react';
import {View, Text, Button, TextInput, FlatList} from 'react-native';

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
export const FtsQuery = () => {

  return (
    <RealmProvider schema={[Book]}>
      <FtsQueryInnards />
    </RealmProvider>
  );
}

// create component to test fts
function FtsQueryInnards(): JSX.Element {

  const realm = useRealm();
  const [bookName, setBookName] = useState('Book name');
  const [bookPrice, setBookPrice] = useState('0');

  // function to create books
  const writeBooks = (bookName: string, price: string) => {
    realm.write(() => {
      realm.create('Book', {
        name: bookName,
        price: price,
      });
    });
  };

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
      <TextInput onChangeText={setBookName} value={bookName} />
      <TextInput onChangeText={setBookPrice} value={bookPrice} />

      <Button 
        title="Add Book" 
        onPress={() => 
        {
          writeBooks(bookName, bookPrice);
        }}
      />
      <Text> Query: Books without 'the': {booksWithoutThe.length} </Text>
      <Text> Query: Books with 'hunger': {booksWithHunger.length} </Text>
    </View>
  )

}