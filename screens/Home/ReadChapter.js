import React, { useEffect, useState } from 'react'
import { FlatList, Text } from 'react-native'
import READING_CHAPTER from '../../apis/get_chapter_content';
import ImageChapter from '../../components/ImageChapter';


export default function ReadChapter({route}) {
    const [data, setData] = useState([]);
    const { url } = route.params;
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
            >
            </FlatList>
        </>
    )
}
