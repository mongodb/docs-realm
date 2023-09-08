import React, {useState} from 'react';
import Realm, {ObjectSchema} from 'realm';
import {RealmProvider, useRealm, useQuery} from '@realm/react';
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
  const writeBooks = (bookName: string, bookPrice: number) => {
    realm.write(() => {
      realm.create(Book, {
        name: bookName,
        price: bookPrice,
      });
    });
  };

  // :snippet-start: react-native-fts-query
  // Retrieve book objects from realm
  const books = useQuery(Book);

  // Filter for books with 'hunger' in the name
  const booksWithHunger = books.filtered("name TEXT $0", "hunger");

  // Filter for books with 'swan' but not 'lake' in the name
  const booksWithSwanWithoutLake = books.filtered("name TEXT $0", "swan -lake");
  // :snippet-end:

  // Return the number of books in query
  return (
    <View>
      <TextInput onChangeText={setBookName} value={bookName} />
      <TextInput onChangeText={setBookPrice} value={bookPrice} />

      <Button 
        title="Add Book" 
        onPress={() => 
        {
          writeBooks(bookName, Number(bookPrice));
        }}
      />
      <Text> Query: Books with 'swan' without 'lake': {booksWithSwanWithoutLake.length} </Text>
      <Text> Query: Books with 'hunger': {booksWithHunger.length} </Text>

      <Text>  </Text>

      <Text> Books list </Text>
      <FlatList
        data={books}
        renderItem={({item}) => (
          <Text>{item.name}</Text>
        )}
        keyExtractor={item => item.name}
      />
    </View>
    
  )

};