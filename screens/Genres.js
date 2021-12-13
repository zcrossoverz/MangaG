import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import LIST_GENRES from '../apis/get_list_genres';

export default function Genres() {
    const [genres, setgenres] = useState([]);
    useEffect(() => {
        LIST_GENRES().then((res) => setgenres(res));
    },[]);
    return (
        <View>
            <FlatList 
            data={genres}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.genres}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(e, i) => i.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    genres: {
        borderWidth: 1,
        padding: 4,
        borderColor:'#f18121',
        height: 40,
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'center',
        margin: 4,
        borderRadius: 8
    } 
});
