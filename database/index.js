import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("MangaG_NguyenNhan");

export const initTable = () => {
    db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE if NOT EXISTS Manga (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT, is_download BOOL,  favorite BOOL, reading_chapter INTEGER, time_read TEXT);',
          [],
          () => console.log('Khởi tạo table manga'),
          (e) => console.log('Lỗi khi khởi tạo table manga: '+e)
        );
      });
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE if NOT EXISTS Chapter (id INTEGER PRIMARY KEY AUTOINCREMENT, manga_url TEXT, manga_name, name TEXT, url TEXT, slug TEXT, max_index INTEGER, star BOOL, time_read TEXT);',
        [],
        () => console.log('Khởi tạo table chapter'),
        (e) => console.log('Lỗi khi khởi tạo table chapter: '+e)
      );
    });

    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE if NOT EXISTS Pending (id INTEGER PRIMARY KEY AUTOINCREMENT, chapter_name INTEGER, url TEXT, manga_name TEXT, manga_url TEXT, slug TEXT);',
        [],
        () => console.log('Khởi tạo table data download'),
        (e) => console.log('Lỗi khi khởi tạo table Datadownload: '+e)
      );
    });


};

export const insertManga = (manga_name, url) => {
    db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO Manga(name, url, is_download, favorite, reading_chapter, time_read) SELECT '"+manga_name+"', '"+url+"', false, false, 0, datetime('now') WHERE NOT EXISTS(SELECT name FROM Manga WHERE name = '"+manga_name+"')",
          [],
          () => console.log("Insert manga "+manga_name+" thành công"),
          (e) => console.log("Lỗi khi insert manga "+manga_name+": ",e)
        )
    });
};

export const insertChapter = (id, manga_url, chapter_name, url, max_index, slug, manga_name) => {
  db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO Chapter(id, name, manga_url, url, max_index, slug, manga_name, time_read) SELECT "+id+",'"+chapter_name+"', '"+manga_url+"', '"+url+"', "+max_index+", '"+slug+"', '"+manga_name+"', datetime('now') WHERE NOT EXISTS(SELECT url FROM Chapter WHERE url = '"+url+"')",
        [],
        () => console.log("Insert chapter "+chapter_name+" vào manga thành công"),
        (e) => console.log("Lỗi khi insert chapter "+chapter_name+": "+e)
      )
  });
};

export const deleteChapterPending = (slug) => {
  db.transaction(tx => {
    tx.executeSql(
      "DELETE FROM Pending WHERE slug='"+slug+"'",
      [],
      () => { console.log('delete pending '); },
      (e) => console.log("Error pending download: ",e)
        )
    });
}

export const insertPendingDownload = (chapter_name, url, manga_url, slug, manga_name) => {
  
  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO Pending(chapter_name, url, manga_url, slug, manga_name) SELECT '"+chapter_name+"', '"+url+"','"+manga_url+"','"+slug+"','"+manga_name+"' WHERE NOT EXISTS(SELECT slug FROM Pending WHERE slug = '"+slug+"')",
      [],
      () => { console.log('insert '+chapter_name); },
      (e) => console.log("Error pending download: ",e)
        )
    });
};

// export const insertDataDownload = (chapter_id, list_data) => {
//   db.transaction(tx => {
//     tx.executeSql(
//       "INSERT INTO DataDownload(chapter_id, uri, time_download) SELECT "+chapter_id+", '"+JSON.stringify(list_data)+"', TIMEDATE('now') WHERE NOT EXISTS(SELECT chapter_id FROM DataDownload WHERE chapter_id = "+chapter_id+")",
//       [],
//       () => { },
//       (e) => console.log("Error download: ",e)
//         )
//     });
// };

// export const checkDownloadedChapter = (chapter_id) => {
//   db.transaction(tx => {
//     tx.executeSql(
//       "UPDATE Chapter SET is_download=true WHERE id="+chapter_id,
//       [],
//       () => { },
//       (e) => console.log("Error download: ",e)
//         )
//     });
// }

export const getManga = (url) => {
  let data = {};
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM Manga WHERE url='"+url+"'",
        [data],
        (tx, res) => res.rows._array[0],
        (e) => console.log("Lỗi khi get manga  ",e)
      )
  });
};

export const getChapter = (url) => {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM Chapter WHERE url="+url,
      [],
      (tx, res) => res.rows._array.forEach(e => {
        console.log(e);
      }),
      (e) => console.log("Lỗi khi get all manga  ",e)
    )
});
}


export const getAllManga = () => {
  db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM Manga",
        [],
        (tx, res) => res.rows._array.forEach(e => {
          console.log(e);
        }),
        (e) => console.log("Lỗi khi get all manga  ",e)
      )
  });
};

// export const getAllDownload = () => {
//   db.transaction(tx => {
//       tx.executeSql(
//         "SELECT * FROM DataDownload",
//         [],
//         (tx, res) => console.log(res),
//         (e) => console.log("Lỗi khi get all manga  ",e)
//       )
//   });
// };


// export const insertDownload = (chapter_id, img) => {
//   img.forEach((e) => {
//       db.transaction(tx => {
//         tx.executeSql(
//           "INSERT INTO DataDownload (chapter_id, uri, time_download) VALUES ("+chapter_id+", '"+e+"', datetime('now'))",
//           [],
//           () => {},
//           (e) => console.log("Lỗi khi insert data download : "+e)
//         )
//       });
//   });
  
//   db.transaction(tx => {
//     tx.executeSql(
//       "UPDATE Chapter SET is_download = true WHERE id = "+chapter_id,
//       [],
//       () => {},
//       (e) => console.log("Lỗi khi insert data download : "+e)
//     )
//   });
// };

export const drop = () => {
  db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE Manga',
        [],
        (tx, res) => {
            console.log("delete manga");
        },
        (e) => console.log(e)
      )
  });
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE Chapter',
        [],
        (tx, res) => {
            console.log("delete chapter");
        },
        (e) => console.log(e)
      )
  });
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE Pending',
      [],
      (tx, res) => {
          console.log("delete datadownload");
      },
      (e) => console.log(e)
    )
  });
  // db.transaction(tx => {
  //   tx.executeSql(
  //     'DROP TABLE Downloading',
  //     [],
  //     (tx, res) => {
  //         console.log("delete datadownload");
  //     },
  //     (e) => console.log(e)
  //   )
  // });
}



// CREATE TABLE if NOT EXISTS Manga (id INTEGER PRIMARY KEY AUTOINCREMENT, name VArCHAR(80), is_download bool,  favorite bool, reading_chapter INTEger, time_read Text)
// CREATE TABLE if NOT EXISTS Chapter (id INTEGER PRIMARY KEY AUTOINCREMENT, manga_id INteger, name VArCHAR(80), is_download bool, star bool, time_read Text)
// CREATE TABLE if NOT EXISTS DataDownload (id INTEGER PRIMARY KEY AUTOINCREMENT, chapter_id integer, uri text, time_download text)

// insert 

// INSERT INTO Manga (name, is_download, favorite, reading_chapter, time_read) VALUES ('Truyen doremon', false, false, 1, datetime('now'))
// INSERT INTO Chapter (name, manga_id, is_download, star, time_read) VALUES ('Chapter 2', 2, false, true, datetime('now'))
// INSERT INTO DataDownload (chapter_id, uri, time_download) VALUES (1, '/mangaG/f.jpg', datetime('now'))