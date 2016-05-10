/**
 * Created by xiaochen on 2016/5/9.
 */
var request = require('request'),
    cheerio = require('cheerio'),
    URL = 'http://www.bilibili.com/video/movie.html';

function run() {
    dataRequest(URL);
}

function dataRequest(dataUrl)
{
    request({
        url: dataUrl,
        gzip:true
    }, function(err, res, body) {
        if (err) {
            console.log(dataUrl);
            console.error('[ERROR]Collection' + err);
            return;
        }

        dataParse(body);
    });
}

function dataParse(body)
{
    console.log('===start collecting===');

    var $ = cheerio.load(body);

    var $list = $('.v-list.sub li');

    $list.each(function (index, item) {
        var title = $(item).find('a .t').text();

        console.info('--------------------------------');
        console.info('title:' + title);
        console.info(' ');
    });
}

run();
