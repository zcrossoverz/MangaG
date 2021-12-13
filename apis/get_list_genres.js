const axios = require('axios');

const LIST_GENRES = () => 
    axios.get('http://nhattruyenvip.com/the-loai')
    .then((res) => {
        const cheerio = require('cheerio');
        const $ = cheerio.load(res.data);
        const genres = [];
        $('.dropdown-genres .form-control option')
            .map((i, e) => {
                const name = e.childNodes[0].data;
                const url = e.attribs.value;
                genres.push({
                    name, url
                });
            });
        return genres;
    }).catch(e => console.log('Error: '+e));

export default LIST_GENRES;
