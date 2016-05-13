/**
 * Created by xiaochen on 2016/5/9.
 */
var Collector = require('./collector');

var config = {
    url: ['http://www.bilibili.com/video/movie.html'],
    //url: ['https://api.github.com/repos/request/request'],
    rule: '.v-list.sub li a .t',
    delay: 100,
    proxy: false,
    complete: function ($item, index) {
        var title = $item.text();
        console.info(index + ':' + title);
    }
};

new Collector(config).run();
