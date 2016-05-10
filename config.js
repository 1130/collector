module.exports = {
    url: ['http://www.bilibili.com/video/movie.html','http://www.bilibili.com/video/movie.html','http://www.bilibili.com/video/movie.html'],
    rule: '.v-list.sub li a .t',
    delay: 1000,
    loaded: function ($item, index) {
        var title = $item.text();
        console.info(index + ' --------------------------------');
        console.info('title:' + title);
        console.info(' ');
    }
};