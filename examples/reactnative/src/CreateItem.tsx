import React from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import styles from './stylesheet';

const CreateItem = ({handleAddItem}) => {
  const [text, onChangeText] = React.useState('Item Description');

  return (
    <View>
      <Text>Create Item: </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />

      <Button
        onPress={() => handleAddItem(text)}
        title="Submit Item"
        color="#841584"
      />
    </View>
  );
};

export default CreateItem;
