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

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var pathstring = '/base?json={"ttop":50,"category":"news","include_etop":true,"SS":"fa","wc":0,"format":"xml","minWeight":0,"userGuid":"0ba98b2e-6da0-4096-b993-954a5790e726","type":"2","text":"happy","minStrength":0,"guid":"0ba98b2e-6da0-4096-b993-954a5790e726","include_ttop":true,"minRankby":0,"etop":10,"domain":"nodomain"}'
    var options = {
      host: 'dsspp.skoonline.org',
      path: pathstring
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
