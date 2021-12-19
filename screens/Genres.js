import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import LIST_GENRES from '../apis/get_list_genres';
import ListByGenres from './ListByGenres';
import DetailManga from './DetailManga';
import ReadChapter from './ReadChapter';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import { Animations } from '../constants/Animation';

const seperate = () => {
    return (
        <View style={{ 
            width: '100%',
            height: 0.5,
            marginRight: 8,
            marginLeft: 8,
            backgroundColor: '#ccc',
        }}></View>
    );
}


const Stack = createNativeStackNavigator();

const listGenres = ({ navigation }) => {
    const animation = Animations[Math.floor(Math.random()*Animations.length)];
    const [genres, setgenres] = useState([]);
    useEffect(() => {
        LIST_GENRES().then((res) => setgenres(res));
    },[]);
    return (
        <View>
            <FlatList 
            data={genres}
            renderItem={({item, index}) => (
                <Animatable.View
                animation={animation}
                // duration={1000}
                delay={index * 100}
                >
                    <TouchableOpacity style={styles.genres} onPress={()=> navigation.navigate('list_by_genres', { url: item.url+'?status=-1', name: item.name })}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                </Animatable.View>
            )}
            keyExtractor={(e, i) => i.toString()}
            ListFooterComponent={<View style={{ height: 20 }}></View>}
            ItemSeparatorComponent={seperate}
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
        padding: 4,
        height: 40,
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'center',
    } 
});
