import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './screens/HomePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailManga from './screens/DetailManga';
import ReadChapter from './screens/ReadChapter';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomePage} />
        <Stack.Screen name="detail_manga" component={DetailManga} />
        <Stack.Screen name="reading_chapter" component={ReadChapter} />
      </Stack.Navigator>
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
