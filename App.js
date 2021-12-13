import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './screens/HomePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailManga from './screens/DetailManga';
import ReadChapter from './screens/ReadChapter';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Setting from './screens/Setting';
import Home from './screens/Home';
import Setting2 from './components/Setting2';
import Genres from './screens/Genres';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="home" component={HomePage} />
        <Stack.Screen name="detail_manga" component={DetailManga} />
        <Stack.Screen name="reading_chapter" component={ReadChapter} />
      </Stack.Navigator> */}
      <Drawer.Navigator>
        <Drawer.Screen name="Genres" component={Genres} options={{ title: "Thể loại" }} />
        <Drawer.Screen name="Home" component={Home} options={{ title: "Mới cập nhật" }} />
        {/* <Drawer.Screen name="Article2" component={Setting} />
        <Drawer.Screen name="Article4" component={Setting} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
