import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import ImageChapter from '../../components/ImageChapter';
import * as FileSystem from 'expo-file-system';

export default function ReadChapterDownload({route}) {
    const [data, setData] = useState([]);
    const { slug } = route.params;
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
            >
            </FlatList>
        </>
    )
}
