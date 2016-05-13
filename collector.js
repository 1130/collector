/**
 * Created by xiaochen on 2016/5/9.
 */
var Request = require('request');
var Cheerio = require('cheerio');
var Proxy = require('./proxy');

function Collector(config) {
    this.config = config;
}

Collector.prototype.run = function () {
    var self = this;
    var config = this.config;
    var urls = config.url;
    if (!Array.isArray(urls)) {
        return;
    }
    urls.forEach(function (url) {
        setTimeout(function () {
            self.request(url);
        }, config.delay);
    });

};

Collector.prototype.request = function (dataUrl) {
    Request({
        url: dataUrl,
        gzip: true,
        proxy: this.config.proxy ? Proxy.get() : '',
        headers: {
            'User-Agent': 'a'
        }
    }, function (err, res, body) {
        if (err) {
            console.log(dataUrl);
            console.error('ERROR:' + err);
            return;
        }

        this.dataParse(body);
    }.bind(this));
};

Collector.prototype.dataParse = function (body) {
    var $ = Cheerio.load(body);
    var $list = $(this.config.rule);

    console.log('===start collecting===');

    $list.each(function (index, item) {
        this.config.complete($(item), index);
    }.bind(this));
};

module.exports = Collector;

