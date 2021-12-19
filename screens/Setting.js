import React, { useState , useEffect } from 'react'
import Header from '../components/Header'
import { View, Text, Image } from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { drop, getAllDownload, getAllManga, getChapter, getManga } from '../database';
import { downloadChapter, readFolder } from '../services/download';



// drop();
// FileSystem.deleteAsync(FileSystem.documentDirectory+'/MangaG', { idempotent: true });

// FileSystem.readDirectoryAsync(FileSystem.documentDirectory+'/SQLite/MangaG_NguyenNhan').then(res => console.log(res))

export default function Setting() {
    useEffect(() => {
        // getAllManga();
        // getManga('http://nhattruyenvip.com/truyen-tranh/than-long-vuong-toa-35881');
        // downloadChapter('http://nhattruyenvip.com/truyen-tranh/ngo-xa/chap-47/802264');
        // getAllDownload();
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Header title="setting 1"/>
            <Text>Hello</Text>
            <Image source={{ uri: FileSystem.documentDirectory+'/MangaG/undefined/1.jpg'}} style={{ height: 300, width: 300 }}/>
        </View>
    )
}
