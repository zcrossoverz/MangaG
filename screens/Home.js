import React from 'react'
import HomePage from './Home/HomePage';
import DetailManga from './Home/DetailManga';
import ReadChapter from './Home/ReadChapter';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerToggleButton } from '@react-navigation/drawer';


const Stack = createNativeStackNavigator();

export default function Home() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomePage} options={{ title:"Mới cập nhật", headerRight: () => <DrawerToggleButton /> }}  />
            <Stack.Screen name="detail_manga" component={DetailManga} options={{ title:'Thông tin truyện' ,headerRight: () => <DrawerToggleButton /> }} />
            <Stack.Screen name="reading_chapter" component={ReadChapter} options={({route})=> ({ title:route.params.list[route.params.current].chapter_name ,headerRight: () => <DrawerToggleButton /> })} />
        </Stack.Navigator>
    )
}
