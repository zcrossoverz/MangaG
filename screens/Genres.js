import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import LIST_GENRES from '../apis/get_list_genres';
import ListByGenres from './ListByGenres';
import DetailManga from './DetailManga';
import ReadChapter from './ReadChapter';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const listGenres = ({ navigation }) => {
    const [genres, setgenres] = useState([]);
    useEffect(() => {
        LIST_GENRES().then((res) => setgenres(res));
    },[]);
    return (
        <View>
            <FlatList 
            data={genres}
            renderItem={({item}) => (
                <TouchableOpacity style={styles.genres} onPress={()=> navigation.navigate('list_by_genres', { url: item.url, name: item.name })}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(e, i) => i.toString()}
            />
        </View>
    );
}

export default function Genres() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="list_genres" component={listGenres} options={{ headerShown: false }} />
            <Stack.Screen name="list_by_genres" component={ListByGenres} options={{ headerShown: false }} />
            <Stack.Screen name="detail_manga" component={DetailManga} options={{ headerShown: false }} />
            <Stack.Screen name="reading_chapter" component={ReadChapter} options={{ headerShown: false }} />
        </Stack.Navigator>
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
