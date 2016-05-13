module.exports = {
    url: ['http://www.bilibili.com/video/movie.html'],
    //url: ['https://api.github.com/repos/request/request'],
    rule: '.v-list.sub li a .t',
    delay: 100,
    proxy: true,
    loaded: function ($item, index) {
        var title = $item.text();
        console.info(index + ':' + title);
    }
};