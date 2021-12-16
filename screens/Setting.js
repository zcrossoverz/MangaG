import React, { useState , useEffect } from 'react'
import Header from '../components/Header'
import { View, Text, Image } from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { drop, getAllManga } from '../database';
import { downloadChapter, readFolder } from '../services/download';

// const downloadFile = () => {
//     const uri = "http://techslides.com/demos/sample-videos/small.mp4"
//     let fileUri = FileSystem.documentDirectory + "/MangaG/small.mp4";
//     FileSystem.downloadAsync(uri, fileUri)
//     .then(({ uri }) => {
//         // saveFile(uri);
//         console.log('download to '+uri);
//       })
//       .catch(error => {
//         console.error(error);
//       })
// }
  

// const saveFile = async (fileUri) => {
//     // const { status } = await Permissions.askAsync(Permissions.WRITE_EXTERNAL_STORAGE);
//     // if (status === "granted") {
//         // const asset = await MediaLibrary.createAssetAsync(fileUri)
//         await FileSystem.writeAsStringAsync(fileUri);
//         console.log(fileUri);
//     // }else{
//         // console.log('not granted');
//     // }
// }
  
// downloadFile();
// // console.log(FileSystem.documentDirectory);
// FileSystem.writeAsStringAsync(FileSystem.documentDirectory+'/nhan123.txt',"hello");
// // FileSystem.readAsStringAsync(FileSystem.documentDirectory+'/nhan123.txt').then(data => console.log(data));
// FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(res => console.log(res));



export default function Setting() {
    useEffect(() => {
        // getAllManga();
        readFolder('undefined');
        // downloadChapter('http://nhattruyenvip.com/truyen-tranh/ngo-xa/chap-47/802264');
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Header title="setting 1"/>
            <Text>Hello</Text>
            <Image source={{ uri: FileSystem.documentDirectory+'/MangaG/undefined/1.jpg'}} style={{ height: 300, width: 300 }}/>
        </View>
    )
}
