import * as FileSystem from 'expo-file-system';
import { documentDirectory } from 'expo-file-system';
const axios = require('axios');

const downloadImage = (uri, slug, name) => {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory+'/MangaG/'+slug);
    FileSystem.downloadAsync(uri, FileSystem.documentDirectory+'/MangaG/'+slug+'/'+name)
    .then(() => console.log('download done '+name))
    .catch(e => console.log('error when download ',e));
};

export const readFolder = (uri) => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory+'/MangaG/'+uri).then(res => console.log(res));
}

export const downloadChapter = (chapter_url, slug, chapter_name) => {
    axios.get(chapter_url)
    .then((res) => {
        const cheerio = require('cheerio');
        const $ = cheerio.load(res.data);
        $('.page-chapter img').map((index, item) => {
            let img = item.attribs['data-original'];
            if(img.includes('anhtoc')){
                img = 'https:'+img;
            }else if(!img.includes('https')){
                img = img.replace('//','https://i0.wp.com/');
            }
            downloadImage(img, slug, index+'.jpg');
        });
    }).catch(e => console.log('Error: ',e));
};

export const downloadManga = (list_chapter) => {
    let chapter = [];
    list_chapter.forEach(e => {
        let slug = e.chapter_url.split('truyen-tranh/')[1];
        chapter.push({
            chapter_name: e.chapter_name,
            slug: slug
        });
    });
    console.log(chapter);
}