/**
 * Created by Administrator on 2017/5/2.
 */
//与外部源交互，例子为获取天气信息
//http://openweathermap.org/接口有变化，待修改
var http=require('http');
var url=require('url');
var qs=require('querystring');

function sendResponse(weatherData,res) {
    var page='<html><head><title>天气预报</title><meta charset="UTF-8"><meta></head>' +
        '<body>' +
        '<form method="post">' +
        '城市:<input name="city"><br>' +
        '<input type="submit" value="获取天气信息" ' +
        '</form>';
    if(weatherData){
        page+='<h1>天气信息</h1><p>' +
            weatherData +
            '</p>';
    };
    page+='</body></html>';
    res.end(page);
};

function parseWeather(weatherResponse,res) {
    var weatherData='';
    weatherResponse.on('data',function (chunk) {
        weatherData+=chunk;
    });
    weatherResponse.on('end',function () {
        sendResponse(weatherData,res);
    })
};

function getWeather(city,res) {
    var options={
        host:'api.openweathermap.org',
        path:'/data/2.5/weather?q='+city
    };
    http.request(options,function (weatherResponse) {
        parseWeather(weatherResponse,res);
    }).end();
};

http.createServer(function (req,res) {
    console.log(req.method);
    if(req.method.toLower=="post"){
        var reqData='';
        req.on('data',function (chunk) {
            reqData+=chunk;
        });
        req.on('end',function () {
            var postParams=qs.parse(reqData);
            getWeather(postParams.city,res);
        });

    }else{
        sendResponse(null,res);
    }
}).listen(3000);