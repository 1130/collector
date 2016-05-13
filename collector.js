/**
 * Created by xiaochen on 2016/5/9.
 */
var Request = require('request');
var Cheerio = require('cheerio');
var Url = require('url');
var Sleep = require('sleep');
var Proxy = require('./proxy');

function Collector(config) {
    this.config = config;
    this.detailPages = [];
}

Collector.prototype.run = function () {
    var self = this;
    var config = this.config;
    var urls = config.url;
    var total = urls.length;
    var doneCount = 0;
    if (!Array.isArray(urls)) {
        return;
    }
    urls.forEach(function (url) {
        setTimeout(function () {

        }, config.delay);
        self.request(url, function (body) {
            self.dataParse(body);
            if (self.allCompleted(++doneCount, total)) {
                self.fetchDetail();
            }
        });
        Sleep.sleep(config.delay);
    });
};

Collector.prototype.allCompleted = function (doneCount, total) {
    return doneCount >= total;
};

Collector.prototype.fetchDetail = function () {
    var self = this;

    this.detailPages.forEach(function (url, index) {
        self.request(url, function (body) {
            self.config.complete(body, index);
        });
        Sleep.sleep(3);
    });

};

Collector.prototype.request = function (dataUrl, done) {
    Request({
        url: dataUrl,
        gzip: true,
        proxy: this.config.proxy ? Proxy.get() : '',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
        }
    }, function (err, res, body) {
        if (err) {
            console.log(dataUrl);
            console.error('ERROR:' + err);
            return;
        }

        done && done(body);
    }.bind(this));
};

Collector.prototype.dataParse = function (body) {
    var $ = Cheerio.load(body);
    var $list = $(this.config.ruleList);

    $list.each(function (index, item) {
        this.detailPages.push(Url.resolve(this.config.url[0], $(item).attr('href')));
        //this.config.complete($(item), index);
    }.bind(this));
};

module.exports = Collector;

