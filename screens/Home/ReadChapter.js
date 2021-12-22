import { prop } from 'cheerio/lib/api/attributes';
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, Picker, StyleSheet, TouchableOpacity } from 'react-native'
import { vw } from 'react-native-expo-viewport-units';
import READING_CHAPTER from '../../apis/get_chapter_content';
import ImageChapter from '../../components/ImageChapter';

const Nav = (props) => {
    const next = props.next;
    const pre = props.pre;
    const current = props.current;
    const list = props.list;
    console.log(current);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.navbtn} onPress={() => props.navigation.navigate('reading_chapter', { 
                url: pre.chapter_url,
                
             })}>
                <Text style={styles.text}>
                    Chap trước
                </Text>
            </TouchableOpacity>
            <Picker
            style={{ width: 120, height: 40, margin: 4, }}
            selectedValue={current}
            mode="dialog"
            onValueChange={
                index => console.log(list[index])
            }
            itemStyle={{ color:'red', fontWeight:'900', fontSize: 18, padding:30, }}>
                {list.map((item, index) => {
                    return (< Picker.Item label={item.chapter_name} value={index} key={index} />);
                })}   
            </Picker>
            <TouchableOpacity style={styles.navbtn}>
                <Text style={styles.text}>
                    Chap sau
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default function ReadChapter({route}) {
    const [data, setData] = useState([]);
    const { url, next, previous, navigation, list, current } = route.params;
    // console.log(next, previous);
    useEffect(() => {
        READING_CHAPTER(url).then(res => setData(res));
    }, []);
    return (
        <>
            <FlatList
            data={data}
            renderItem={({ item }) => <ImageChapter url={item} /> }
            keyExtractor={(e, i) => i.toString()}
            initialNumToRender={5}
            // stickyHeaderIndices={[0]}
            ListHeaderComponent={() => <Nav next={next} pre={previous} navigation={navigation} list={list} current={current} />}
            ListFooterComponent={() => <Nav next={next} pre={previous} navigation={navigation} list={list} current={current} />}
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