/**
 * Created by xiaochen on 2016/5/12.
 */
var PROXY_LIST = [
    {"ip": "59.173.119.64", "port": "8090"},
    {"ip": "1.56.131.126", "port": "8090"},
    {"ip": "116.7.211.245", "port": "8090"}
];


module.exports.get = function () {

    var randomNum = parseInt(Math.floor(Math.random() * PROXY_LIST.length));
    var proxy = PROXY_LIST[randomNum];
console.log(proxy.ip);
    return 'http://' + proxy.ip + ':' + proxy.port;
};