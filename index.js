/**
 * Created by xiaochen on 2016/5/9.
 */
var request = require('request'),
    cheerio = require('cheerio'),
    URL_36KR = 'http://36kr.com/';

/* �������ݲɼ��� */
function run() {
    dataRequest(URL_36KR);
}

/* �������� */
function dataRequest(dataUrl)
{
    request({
        url: dataUrl,
        method: 'GET'
    }, function(err, res, body) {
        if (err) {
            console.log(dataUrl)
            console.error('[ERROR]Collection' + err);
            return;
        }

        switch(dataUrl)
        {
            case URL_36KR:

                dataParse36Kr(body);

                break;
        }


    });
}

/* 36kr ���ݽ��� */
function dataParse36Kr(body)
{
    console.log('============================================================================================');
    console.log('======================================36kr==================================================');
    console.log('============================================================================================');

    var $ = cheerio.load(body);

    var articles = $('article');

    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        var descDoms = $(article).find('.desc');

        if(descDoms.length == 0)
        {
            continue;
        }

        var coverDom = $(article).children().first();
        var titleDom = $(descDoms).find('.info_flow_news_title');
        var timeDom = $(descDoms).find('.timeago');

        var titleVal =  titleDom.text();
        var urlVal = titleDom.attr('href');
        var timeVal = timeDom.attr('title');
        var coverUrl = coverDom.attr('data-lazyload');

        //����ʱ��
        var timeDateSecs = new Date(timeVal).getTime() / 1000;

        if(urlVal != undefined)
        {
            console.info('--------------------------------');
            console.info('���⣺' + titleVal);
            console.info('��ַ��' + urlVal);
            console.info('ʱ�䣺' + timeDateSecs);
            console.info('���棺' + coverUrl);
            console.info('--------------------------------');
        }
    }
}

run();
