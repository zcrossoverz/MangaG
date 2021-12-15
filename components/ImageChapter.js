import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Dimensions  } from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units';

export default function ImageChapter(props) {
    const [height, setheight] = useState(0);
    useEffect(() => {
    Image.getSize(props.url, (w,h) => {
        setheight(Dimensions.get('window').width*(h/w))
    });
    }, []);
    return (
        <View style={styles.container}>
            {
                height != 0 ? 
                (
                    <Image source={{ uri: props.url }} 
                        resizeMode="contain"
                        style={styles.image}
                        style={{ height: height }}
                    />
                ) : (
                    <Image source={require(`../assets/loading-image.gif`)}
                    style={{ height: vh(60), width: vw(100), marginBottom: 12 }} />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: vw(100)
    }
});