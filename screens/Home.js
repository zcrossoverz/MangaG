import React from 'react'
import HomePage from './Home/HomePage';
import DetailManga from './Home/DetailManga';
import ReadChapter from './Home/ReadChapter';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function Home() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomePage} options={{ headerShown: false }} />
            <Stack.Screen name="detail_manga" component={DetailManga} options={{ headerShown: false }} />
            <Stack.Screen name="reading_chapter" component={ReadChapter} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
