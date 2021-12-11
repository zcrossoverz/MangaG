import { prop } from 'cheerio/lib/api/attributes';
import React from 'react'
import { ImageBackground, Text, StyleSheet, TouchableOpacity  } from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units';

export default function Item(props) {

    return (
        <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('detail_manga', {
          url: props.item.url
        })}>
            <ImageBackground style={styles.image} resizeMode="cover" imageStyle={{ borderRadius: 8}} source={{ uri: props.item.thumbnail }}      >
            <Text style={styles.text}>{props.item.title}</Text>    
            </ImageBackground> 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      minWidth: vw(42),
      height: vh(40),
      margin: 8
    },
    image: {
      flex: 1,
      justifyContent: "flex-end",
      
    },
    text: {
      color: "white",
      flexWrap: "nowrap",
      flex: 1,
      fontSize: 12,
      lineHeight: 32,
      maxHeight: 32,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      alignItems: "center"
    }
  });
  