/**
 * Created by xiaochen on 2016/5/9.
 */
var Request = require('request');
var Cheerio = require('cheerio');
var Config = require('./config');
var Proxy = require('./proxy');
var URLS = Config.url;

function run() {
    if (!Array.isArray(URLS)) {
        return;
    }
    URLS.forEach(function (url) {
        setTimeout(function () {
            dataRequest(url);
        }, Config.delay);
    });

}

function dataRequest(dataUrl) {
    Request({
        url: dataUrl,
        gzip: true,
        proxy: Config.proxy ? Proxy.get() : '',
        headers: {
            'User-Agent': 'a'
        }
    }, function (err, res, body) {
        if (err) {
            console.log(dataUrl);
            console.error('ERROR:' + err);
            return;
        }

        dataParse(body);
    });
}

function dataParse(body) {
    var $ = Cheerio.load(body);
    var $list = $(Config.rule);

    console.log('===start collecting===');

    $list.each(function (index, item) {
        Config.loaded($(item), index);
    });
}


run();
