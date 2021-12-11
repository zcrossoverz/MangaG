import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native';
import LATEST_UPDATE from '../apis/latest_update_list';
import Item from '../components/Item';

export default function HomePage({ navigation }) {
    const [listManga, setListManga] = useState([]);
    useEffect(() => {
        LATEST_UPDATE(1).then(res => setListManga(res));
    }, []);
    return (
        <View>
        { listManga.length === 0  && <Text>Loading</Text> }
            <FlatList
                data={listManga}
                renderItem={({item}) => 
                    <Item item={item}
                    navigation={navigation}/>
                }
                numColumns={2}
                keyExtractor={item => item.index}
                maxToRenderPerBatch={10}
                initialNumToRender={6}
            >
            </FlatList>
        </View>
    );

    
}
