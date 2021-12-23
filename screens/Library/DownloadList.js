import React, { useState , useEffect } from 'react'
import Header from '../../components/Header'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { drop, getAllDownload, getAllManga, getChapter, getManga } from '../../database';
import { downloadAllChapter, downloadChapter, getListPendingDownload, readFolder } from '../../services/download';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("MangaG_NguyenNhan");


const Item = (props) => {
    return (
        <Text>{props.item.manga_name} - {props.item.name}</Text>
    );
}


export default function DownloadList({ navigation }) {
    const [list, setlist] = useState([]);
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
              "SELECT * FROM Chapter ORDER BY id ASC",
              [],
              (tx, res) => setlist(res.rows._array),
              (e) => console.log("error get data downloaded ",e)
            )
        });
    }, [list]);
    return (
        <View style={{ flex: 1 }}> 
            <Text>List downloaded</Text>
            <FlatList 
            data={list}
            keyExtractor={(e, i) => i.toString()}
            renderItem={({item, index}) => <TouchableOpacity style={{ height: 50, width: '100%', borderColor: 'red', borderWidth: 1 }} onPress={() => {
                navigation.navigate('reading_chapter', {
                    slug: item.slug,
                    navigation,
                    list,
                    current: index
                });
            }}><Item item={item} /></TouchableOpacity>}
            />
        </View>
    )
}
