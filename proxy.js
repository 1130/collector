/**
 * Created by xiaochen on 2016/5/12.
 */
var PROXY_LIST = [
    {"ip": "59.173.119.64", "port": "8090"},
    {"ip": "116.7.211.245", "port": "8090"},
    {"ip": "182.105.11.227", "port": "9000"},
    {"ip": "113.229.6.130", "port": "8090"}
];


module.exports.get = function () {

    var randomNum = parseInt(Math.floor(Math.random() * PROXY_LIST.length));
    var proxy = PROXY_LIST[randomNum];
console.log(proxy.ip);
    return 'http://' + proxy.ip + ':' + proxy.port;
};