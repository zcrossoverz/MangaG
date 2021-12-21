import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DownloadList from './Library/DownloadList';
import ReadChapterDownload from './Library/ReadChapterDownload';


const Stack = createNativeStackNavigator();

export default function Library() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="list_download" component={DownloadList} options={{ headerShown: false }} />
            <Stack.Screen name="reading_chapter" component={ReadChapterDownload} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
