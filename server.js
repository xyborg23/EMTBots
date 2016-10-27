var restify = require('restify');
var builder = require('botbuilder');
var http = require('http');
var xml2js = require('xml2js');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
var remoteSessionKey = "";
var JSONObject = {};
JSONObject.ttop = 50;
JSONObject.category = "news";
JSONObject.include_etop = true;
JSONObject.target = "bad diseases";
JSONObject.SS = "fa";
JSONObject.wc = 0;
JSONObject.notes = "";
JSONObject.sessionKey = "";
JSONObject.format = "xml";
JSONObject.minWeight = 0;
JSONObject.userGuid = "44064767-a6ef-4c70-9536-cf196ee6794a";
JSONObject.type = "2";
JSONObject.text = "";
JSONObject.minStrength = 0;
JSONObject.current = "cancer sickness";
JSONObject.guid = "ea8308d1-f93c-457d-84c8-1fa4457c7148";
JSONObject.include_ttop = true;
JSONObject.minRankby = 0;
JSONObject.etop = 10;
JSONObject.domain = "nodomain";
var jsonString = JSON.stringify(JSONObject);
var pathpath = '/lcc?json=' + jsonString;
pathpath = encodeURI(pathpath);
console.dir(jsonString);

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    answerInput = "bad disease";
    answerInput = encodeURI(answerInput);
    console.log(answerInput);
    // var pathstring = '/lcc?json={"ttop":50,"category":"news","include_etop":true,"target":"","SS":"fa","wc":0,"notes":"","sessionKey":"ag9zfmRzc3BwMjAxMS1ocmRyFwsSCkxDQ1Nlc3Npb24YgICAoK2_mAoM","format":"xml","minWeight":0,"userGuid":"44064767-a6ef-4c70-9536-cf196ee6794a","type":"2","text":"","minStrength":0,"current":"' + answerInput + '","guid":"ea8308d1-f93c-457d-84c8-1fa4457c7148","include_ttop":true,"minRankby":0,"etop":10,"domain":"nodomain"}';
    // console.log(pathstring);
    // var pathstring = '/lcc?json={"ttop":50,"category":"news","include_etop":true,"target":"","SS":"fa","wc":0,"notes":"","sessionKey":"ag9zfmRzc3BwMjAxMS1ocmRyFwsSCkxDQ1Nlc3Npb24YgICAoK2_mAoM","format":"xml","minWeight":0,"userGuid":"44064767-a6ef-4c70-9536-cf196ee6794a","type":"2","text":"","minStrength":0,"current":"bad%20diesease","guid":"ea8308d1-f93c-457d-84c8-1fa4457c7148","include_ttop":true,"minRankby":0,"etop":10,"domain":"nodomain"}';
    // console.log(pathstring);

    var options = {
      host: 'dsspp.skoonline.org',
      path: pathpath
    };

    callback = function(response) {
      var str = '';

      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        console.log(str);
      });
    }

    http.request(options, callback).end();

    session.send("Hello World");
});
