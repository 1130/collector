/**
 * Created by xiaochen on 2016/5/9.
 */
var Collector = require('./collector');
var Cheerio = require('cheerio');

var config = {
    url: ['http://www.bilibili.com/video/movie.html'],
    //url: ['https://api.github.com/repos/request/request'],
    ruleList: '.v-list.sub li a',
    delay: 100,
    proxy: false,
    complete: function (body, index) {
        var $ = Cheerio.load(body);
        var title = $('title').text();

        console.info(index + ':' + title);
    }
};

new Collector(config).run();
