import React, { useEffect, useState } from 'react'
import DETAIL_MANGA from "../apis/get_detail_manga";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, View, Dimensions, StyleSheet, Text, Image, FlatList, ScrollView, TouchableOpacity, Button } from "react-native";
import Chapter from '../components/Chapter';
import { vw, vh } from 'react-native-expo-viewport-units';
import Loading from '../components/Loading';
import { insertManga } from '../database';
import { downloadManga } from '../services/download';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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

// const downloadManga = (data) => {
    
// }

export default function DetailManga({route, navigation}) {
    const [data, setData] = useState(false);
    const { url } = route.params;
    useEffect(() => {
        DETAIL_MANGA(url).then(res => {
            setData(res);
            insertManga(res.title, url);
        });
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            {
                data && (
                    <ScrollView
                    showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.detail_image}>
                            <Image style={styles.image_thumbnail}
                            source={{ uri: data.thumbnail }}
                            />
                        </View>
                        <View style={styles.detail_info}>
        
                        <Text style={styles.title}>{ data.title }</Text>
                        <FlatList 
                        data={data.genres}
                        horizontal
                        style={{ maxWidth: vw(100) }}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity style={styles.genres}>
                                    <Text style={styles.genres_text}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item) => item.toString()}
                        />
                        <Text style={styles.text}><MaterialCommunityIcons name="pencil" size={25} /> Tác giả: { data.author }</Text>
                        <Text style={styles.text}><MaterialCommunityIcons name="rss" size={25} /> Tình trạng: { data.status }</Text>
                        <Text style={styles.text}><MaterialCommunityIcons name="calendar-text" size={25} /> Giới thiệu:</Text>
                        <Text style={styles.text}>{ data.summary }</Text>
                        <ScrollView style={styles.list_chapter}
                        nestedScrollEnabled 
                        >
                            <FlatList 
                            data={data.chapter_list}
                            keyExtractor={(item, index) => index.toString()}
                            nestedScrollEnabled 
                            renderItem={({item}) => 
                                <Chapter 
                                item={item}
                                navigation={navigation}
                                />
                            }
                            ItemSeparatorComponent={seperate}
                            >
                            </FlatList>
                        </ScrollView>
                                <TouchableOpacity style={styles.genres} onPress={() => downloadManga(data.chapter_list)}>
                                    <Text style={styles.genres_text}>
                                        Download
                                    </Text>
                                </TouchableOpacity>
                        </View>
                    </ScrollView>
                )
            }
            {
                !data && (
                    <View style={styles.loading}>
                        <Loading />
                    </View>
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 0,
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        backgroundColor: '#fff'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignContent:'center'
    }
    ,
    detail_image: {
        padding: 8,
        height: screenHeight/2.5,
        backgroundColor: '#fff',
        margin: 4,
        alignItems: 'center',
        display: 'flex'
    },
    image_thumbnail: {
        width: '50%',
        backgroundColor: '#fff',
        height: '100%',
        resizeMode: 'none',
        borderRadius: 8,
        resizeMode: 'cover',
    },
    detail_info: {
        minHeight: 250,
        padding: 8,
        margin: 8,
        marginTop: 0,
        paddingTop: 0
    },
    title: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20
    },
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
    },
    genres_text: {
        color:'#f18121'
    },
    size_vector: {
        width: 10,
        height: 10
    },
    text: {
        padding: 4,
        fontSize: 16
    },
    list_chapter: {
        height: 200,
        borderColor: '#a83232',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 12,
    },

});