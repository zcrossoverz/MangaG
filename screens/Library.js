import React from 'react'
import HomePage from './HomePage';
import DetailManga from './DetailManga';
import ReadChapter from './ReadChapter';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DownloadList from './DownloadList';
import ReadChapterDownload from './ReadChapterDownload';


const Stack = createNativeStackNavigator();

export default function Library() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="list_download" component={DownloadList} options={{ headerShown: false }} />
            <Stack.Screen name="reading_chapter" component={ReadChapterDownload} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
