import React, { useState } from 'react';
import { Text, View, Button, TextInput} from 'react-native';
import styles from './stylesheet';

import ItemContext, { Item } from "./Item";
import UpdateItemPopUp from './UpdateItemPopUp';
const { useRealm, useQuery, useObject } = ItemContext;

const ItemList = ({  }) => {
    const [text, onChangeText] = useState('');
    const realm = useRealm();
    const result = useQuery(Item);

    return (
        <View>
            <Text> Item List: </Text>
            {
                result.map((item, i) => (
                <View>
                    <View style={styles.itemWrapper}>
                        <UpdatableItem description={item.description} id={item._id} />
                    </View>
                </View>
                ))
            }
        </View>
    )
}

const UpdatableItem = ({ description, id}) => {
    const [text, onChangeText] = useState(description);
    const realm = useRealm();

    const myItem = useObject("Item", id)

    const handleUpdateItem = () => {
        realm.write(() => {
            myItem.description = text;
        })
    }

    const handleDeleteItem = () => {
        realm.write(() => {
            realm.delete(myItem)
        })
    }

    return (
        <>
            <TextInput
                style={styles.listItemChild}
                onChangeText={onChangeText}
                value={text}
            />
            <View style={styles.listItemChild}> 
                <Button onPress={() => handleUpdateItem()} title="update"/>
            </View>

            <View style={styles.listItemChild}> 
                <Button onPress={() => handleDeleteItem()} title="delete"/>
            </View>
        </>
    )
}

export default ItemList;