import React, { useState , useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { downloadAllChapter } from '../../services/download';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("MangaG_NguyenNhan");


const ItemPending = (props) => {
    return (
        <Text>{props.item.chapter_name} - {props.item.slug}</Text>
    );
}

export default function PendingDownload() {
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
