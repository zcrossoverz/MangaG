import React, { useEffect, useState } from 'react'
import { FlatList, View, TouchableOpacity, Text, StyleSheet, Picker } from 'react-native'
import ImageChapter from '../../components/ImageChapter';
import * as FileSystem from 'expo-file-system';
import { vw } from 'react-native-expo-viewport-units';


const Nav = (props) => {
    const current = props.current;
    const list = props.list;
    return (
        <View style={styles.container}>
            {
                current < list.length-1 && (
                    <TouchableOpacity style={styles.navbtn} onPress={() => props.navigation.replace('reading_chapter', { 
                        url: list[current+1].chapter_url,
                        navigation: props.navigation,
                        list: props.list,
                        current: props.current+1
                     })}>
                        <Text style={styles.text}>
                            Chap trước
                        </Text>
                    </TouchableOpacity>
                )
            }
            <Picker
            style={{ width: 120, height: 40, margin: 4, }}
            selectedValue={current}
            mode="dialog"
            onValueChange={
                index => props.navigation.replace('reading_chapter', { 
                    url: list[index].chapter_url,
                    navigation: props.navigation,
                    list: props.list,
                    current: index
                 })
            }
            itemStyle={{ color:'red', fontWeight:'900', fontSize: 18, padding:30, }}>
                {list.map((item, index) => {
                    return (< Picker.Item label={item.chapter_name} value={index} key={index} />);
                })}   
            </Picker>
            {
                current > 0 && (
                    <TouchableOpacity style={styles.navbtn}
                        onPress={() => props.navigation.replace('reading_chapter', { 
                            url: list[current-1].chapter_url,
                            navigation: props.navigation,
                            list: props.list,
                            current: props.current-1
                        })}>
                            <Text style={styles.text}>
                                Chap sau
                            </Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}


export default function ReadChapterDownload({route}) {
    const [data, setData] = useState([]);
    const { slug, navigation, list, current } = route.params;
    useEffect(() => {
        let imgs = [];
        const folder = FileSystem.documentDirectory+'/MangaG/'+slug;
        FileSystem.readDirectoryAsync(folder).then(raw => {
            let res = [];
            res = raw.map(e => e.split('.jpg')[0]);
            res.sort(function(a, b){return a - b});
            res.forEach(e => imgs.push(folder+"/"+e+".jpg"));
            setData(imgs);
        });
    }, []);
    return (
        <>
            <FlatList
            data={data}
            renderItem={({ item }) => <ImageChapter url={item} /> }
            keyExtractor={(e, i) => i.toString()}
            initialNumToRender={6}
            ListHeaderComponent={() => <Nav navigation={navigation} list={list} current={current} />}
            ListFooterComponent={() => <Nav navigation={navigation} list={list} current={current} />}
            >
            </FlatList>
        </>
    )
}

const styles = StyleSheet.create({

    navbtn: {
        padding: 4,
        height: 40,
        alignItems:'center',
        backgroundColor:'#d9534f',
        justifyContent:'center',
        margin: 4,
        borderRadius: 8,
        width: vw(20)
    },
    text: {
        color:'#fff'
    },
    container: {
        flex:1,
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 8
    }
});