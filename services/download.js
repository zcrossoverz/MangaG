import * as FileSystem from 'expo-file-system';
import { documentDirectory } from 'expo-file-system';
import { checkDownloadedChapter, deleteChapterPending, getChapter, insertChapter, insertDataDownload, insertPendingDownload } from '../database';
const axios = require('axios');
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("MangaG_NguyenNhan");


const downloadImage = (uri, slug, name) => {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory+'/MangaG/'+slug, { intermediates: true }).then(() => {
        FileSystem.downloadAsync(uri, FileSystem.documentDirectory+'/MangaG/'+slug+'/'+name)
        .catch(e => console.log('error when download ',e));
    });
};

export const readFolder = (uri) => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory+'/MangaG/'+uri).then(res => console.log(res));
}

export const downloadChapter = (id, manga_url, chapter_url, slug, chapter_name, manga_name) => {
    axios.get(chapter_url)
    .then((res) => {
        const cheerio = require('cheerio');
        const $ = cheerio.load(res.data);
        const z = $('.page-chapter img');
        const max_index = z.length - 1;
        deleteChapterPending(slug);
        insertChapter(id, manga_url, chapter_name, chapter_url, max_index, slug, manga_name);
        z.map((index, item) => {
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


export const downloadAllChapter = () => {
    db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM Pending ORDER BY id ASC",
          [],
          (tx, res) => {
              res.rows._array.forEach(e => {
                  downloadChapter(e.id, e.manga_url, e.url, e.slug, e.chapter_name, e.manga_name);
              });
          },
          (e) => console.log("Error import data ",e)
        )
    });
}

export const downloadManga = (list_chapter, manga_url) => {
    list_chapter.forEach((e, i) => {
        let slug = e.chapter_url.split('truyen-tranh/')[1];
        downloadChapter(e.chapter_url, slug, e.chapter_name);
    });
};

export const addToPendingDownload = (list_chapter, manga_name) => {
    list_chapter.reverse();
    list_chapter.forEach((e, i) => {
        let slug = e.chapter_url.split('truyen-tranh/')[1];
        let manga_url = e.chapter_url.split('/chap-')[0];
        insertPendingDownload(e.chapter_name, e.chapter_url, manga_url, slug, manga_name);
    });
};

export const getListPendingDownload = () => {
    db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM Pending",
          [],
          (tx, res) => res.rows._array.forEach((e) => {

          }),
          (e) => console.log("Error import data ",e)
        )
    });
}