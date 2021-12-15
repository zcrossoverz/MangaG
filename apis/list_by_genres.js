const axios = require('axios');

const LIST_BY_GENRES = (url) => 
    axios.get(url)
    .then((res) => {
        const cheerio = require('cheerio');
        const $ = cheerio.load(res.data);
            const items = $('.items .item .clearfix div.image > a')
            .map((index, item) => {
                let image = item.childNodes[1].attribs['data-original'];
                if(!image.includes('https')) image = 'https:'+image;
                return {
                    title: item.attribs.title.replace('Truyện tranh ',''),
                    url: item.attribs.href,
                    thumbnail: image,
                    index: index
                };
            });

        // console.log(items);
        return items;
    }).catch(e => console.log('Error: '+e));

export default LIST_BY_GENRES;