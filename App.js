import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home';
import Setting2 from './components/Setting2';
import Genres from './screens/Genres';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { initTable } from './database';
import Downloaded from './screens/Library/PendingDownload';
import Library from './screens/Library';
import Test from './screens/Test';


const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

initTable();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {/* <Drawer.Screen name="Setting" component={Setting} options={{ title: "Setting" }} /> */}
        <Drawer.Screen name="Home" component={Home} options={{ title: "Mới cập nhật", headerShown: false }}  />
        <Drawer.Screen name="Genres" component={Genres} options={{ title: "Thể loại", headerShown: false }} />
        <Drawer.Screen name="Library" component={Library} options={{ title: "Thư viện", headerShown: false }} />
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
