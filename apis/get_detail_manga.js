const axios = require('axios');

const DETAIL_MANGA = (url) => 
    axios.get(url)
    .then((res) => {
        const cheerio = require('cheerio');
        const $ = cheerio.load(res.data);
        const title = $('h1.title-detail').text();
        let genres = [];
        $('.list-info .kind p a')
        .map((index, item) => {
            genres.push(item.childNodes[0].data);
        });
        const status = $('.list-info .status .col-xs-8').text();
        const author = $('.list-info .author .col-xs-8').text();
        let thumbnail = $('.detail-info .row .col-image img')[0].attribs.src;
        if(!thumbnail.includes('https')) thumbnail = 'https:'+thumbnail;
        const summary = $('.detail-content').text().replace('Nội dung','').trim();
        let chapter_list = [];
        $('.list-chapter nav ul li .chapter a')
        .map((index, item) => {
            chapter_list.push({
                chapter_name: item.children[0].data,
                chapter_url: item.attribs.href
            });
        });
        return {
                title, genres, status, author, thumbnail, summary, chapter_list
            };
    }).catch(e => console.log('Error: '+e));

export default DETAIL_MANGA;
