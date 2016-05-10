/**
 * Created by xiaochen on 2016/5/9.
 */
var request = require('request');
var cheerio = require('cheerio');
var config = require('./config');
var URLS = config.url;

function run() {
    if (!Array.isArray(URLS)) {
        return;
    }
    URLS.forEach(function (url) {
        setTimeout(function () {
            dataRequest(url);
        }, config.delay);
    });

}

function dataRequest(dataUrl) {
    request({
        url: dataUrl,
        gzip: true
    }, function (err, res, body) {
        if (err) {
            console.log(dataUrl);
            console.error('[ERROR]Collection' + err);
            return;
        }

        dataParse(body);
    });
}

function dataParse(body) {
    var $ = cheerio.load(body);
    var $list = $(config.rule);

    console.log('===start collecting===');

    $list.each(function (index, item) {
        config.loaded($(item), index);
    });
}

run();
