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


const ItemPending = (props) => {
    return (
        <Text>{props.item.chapter_name} - {props.item.slug}</Text>
    );
}

export default function Downloaded() {
    const [pendingDownload, setpendingDownload] = useState([]);
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
              "SELECT * FROM Pending",
              [],
              (tx, res) => setpendingDownload(res.rows._array),
              (e) => console.log("Error import data ",e)
            )
        });

    

    }, [pendingDownload])
    return (
        <View style={{ flex: 1 }}>
            <FlatList 
            data={pendingDownload}
            keyExtractor={(e, i) => i.toString()}
            renderItem={({item}) => <ItemPending item={item} />}
            />
            <TouchableOpacity style={{ height:60, width: 200, borderColor:'blue', borderWidth:1, alignItems:'center', justifyContent:'center', margin:12, borderRadius:8 }} onPress={() => downloadAllChapter()}>
                                    <Text>
                                        Download
                                    </Text>
            </TouchableOpacity>
        </View>
    )
}
