import React, { useState , useEffect } from 'react'
import Header from '../components/Header'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { drop, getAllDownload, getAllManga, getChapter, getManga } from '../database';
import { downloadAllChapter, downloadChapter, getListPendingDownload, readFolder } from '../services/download';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("MangaG_NguyenNhan");


const Item = (props) => {
    return (
        <Text>{props.item.manga_name}</Text>
    );
}


export default function Test({ navigation }) {
    const [list, setlist] = useState([]);
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
              "SELECT * FROM Chapter GROUP BY manga_url",
              [],
              (tx, res) => setlist(res.rows._array),
              (e) => console.log("error get data downloaded ",e)
            )
        });
    }, [])
    return (
        <View style={{ flex: 1 }}> 
            <Text style={{ margin:10 }}>Truyện đã download: </Text>
            <FlatList 
            data={list}
            keyExtractor={(e, i) => i.toString()}
            renderItem={({item}) => <Item item={item} />}
            />
        </View>
    )
}
