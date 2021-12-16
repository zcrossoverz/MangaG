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
        'CREATE TABLE if NOT EXISTS Chapter (id INTEGER PRIMARY KEY AUTOINCREMENT, manga_id INTEGER, name TEXT, url TEXT, is_download BOOL, star BOOL, time_read TEXT);',
        [],
        () => console.log('Khởi tạo table chapter'),
        (e) => console.log('Lỗi khi khởi tạo table chapter: '+e)
      );
    });

    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE if NOT EXISTS DataDownload (id INTEGER PRIMARY KEY AUTOINCREMENT, chapter_id INTEGER, uri TEXT, time_download TEXT);',
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

export const insertChapter = (manga_id, chapter_name, url) => {
  db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO Chapter(manga_id, name, url, is_download, star, time_read) SELECT "+manga_id+", '"+chapter_name+"', '"+url+"', false, false, datetime('now') WHERE NOT EXISTS(SELECT name FROM Chapter WHERE url = '"+url+"')",
        [],
        () => console.log("Insert chapter "+chapter_name+" vào manga "+manga_id+" thành công"),
        (e) => console.log("Lỗi khi insert chapter "+chapter_name+": "+e)
      )
  });
};


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


export const insertDownload = (chapter_id, img) => {
  img.forEach((e) => {
      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO DataDownload (chapter_id, uri, time_download) VALUES ("+chapter_id+", '"+e+"', datetime('now'))",
          [],
          () => {},
          (e) => console.log("Lỗi khi insert data download : "+e)
        )
      });
  });
  
  db.transaction(tx => {
    tx.executeSql(
      "UPDATE Chapter SET is_download = true WHERE id = "+chapter_id,
      [],
      () => {},
      (e) => console.log("Lỗi khi insert data download : "+e)
    )
  });
};

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
      'DROP TABLE DataDownload',
      [],
      (tx, res) => {
          console.log("delete datadownload");
      },
      (e) => console.log(e)
    )
  });
}



// CREATE TABLE if NOT EXISTS Manga (id INTEGER PRIMARY KEY AUTOINCREMENT, name VArCHAR(80), is_download bool,  favorite bool, reading_chapter INTEger, time_read Text)
// CREATE TABLE if NOT EXISTS Chapter (id INTEGER PRIMARY KEY AUTOINCREMENT, manga_id INteger, name VArCHAR(80), is_download bool, star bool, time_read Text)
// CREATE TABLE if NOT EXISTS DataDownload (id INTEGER PRIMARY KEY AUTOINCREMENT, chapter_id integer, uri text, time_download text)

// insert 

// INSERT INTO Manga (name, is_download, favorite, reading_chapter, time_read) VALUES ('Truyen doremon', false, false, 1, datetime('now'))
// INSERT INTO Chapter (name, manga_id, is_download, star, time_read) VALUES ('Chapter 2', 2, false, true, datetime('now'))
// INSERT INTO DataDownload (chapter_id, uri, time_download) VALUES (1, '/mangaG/f.jpg', datetime('now'))