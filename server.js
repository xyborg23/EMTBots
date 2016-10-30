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
JSONObject.target = "Force is mass times acceleration. It is the strength of physical action.";
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
JSONObject.current = "";
JSONObject.guid = "ea8308d1-f93c-457d-84c8-1fa4457c7148";
JSONObject.include_ttop = true;
JSONObject.minRankby = 0;
JSONObject.etop = 10;
JSONObject.domain = "nodomain";
var jsonString = JSON.stringify(JSONObject);
var pathpath = '/lcc?json=' + jsonString;
pathpath = encodeURI(pathpath);
console.dir(jsonString);

var cc = "";
var ct = 0;
var r_old = "";
var r_new = "";
var irr_old = "";
var irr_new =  "";

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function (session) {
        session.send("Welcome! Let's start with some questions!")
        session.beginDialog('/q1');
    },
    function (session, results) {
        session.send("Thank you for trying this out!");
    }
]);

bot.dialog('/q1', [
    function (session, args) {
        // Save previous state (create on first call)
        session.dialogData.answer = args ? args.answer : "";

        // Prompt user for next field
        builder.Prompts.text(session, "What is force?");
    },
    function (session, results) {
        // Save users reply
        session.dialogData.answer = results.response;

        // Check for end of form
        if (session.dialogData.answer != "" && ct < 0.6) {
            session.send("You said " + session.dialogData.answer);
            answerInput = encodeURI(session.dialogData.answer);
            JSONObject.current = answerInput;
            var jsonString = JSON.stringify(JSONObject);
            var pathpath = '/lcc?json=' + jsonString;
            pathpath = encodeURI(pathpath);
            console.log("THIS IS THE PATH ========== " + pathpath);

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
                  var parseString = xml2js.parseString;
                  parseString(str, function(err, results) {
                      cc = results['lcc']['CC'];
                      ct = results['lcc']['CT'];
                      r_old = results['lcc']['RO'];
                      r_new = results['lcc']['RN'];
                      irr_old = results['lcc']['IO'];
                      irr_new = results['lcc']['IN'];
                      remoteSessionKey = results['lcc']['sessionKey'];
                      JSONObject.sessionKey = encodeURI(remoteSessionKey);
                      console.dir(results);
                      console.log("CC ============= " + cc);
                      console.log("CT ============= " + ct);
                      console.log("RO ============= " + r_old);
                      console.log("RN ============= " + r_new);
                      console.log("IO ============= " + irr_old);
                      console.log("IN ============= " + irr_new);
                  });
                  console.log(str);
              });
            }

            http.request(options, callback).end();
            // Next field
            session.replaceDialog('/q1');
            // session.replaceDialog('/q1', session.dialogData);
        } else {
            // Return completed form
            console.log("CT: " + ct);
            console.log("END DIALOG");
            session.endDialogWithResult({ response: session.dialogData.answer });
        }
    }
]);

var botReplies = [
    { field: 'q1', prompt: "What is force?" },
    { field: 'RN', prompt: "Great! Can you elaborate?" },
    { field: 'RO', prompt: "That is correct, but tell me something more." },
    { field: 'IN', prompt: "That does not seem relevant here. Try again." },
    { field: 'IO', prompt: "Try thinking of your answer in another way." }
];

//
// bot.dialog('/', function (session) {
//     answerInput = "bad disease";
//     answerInput = encodeURI(answerInput);
//     console.log(answerInput);
//     // var pathstring = '/lcc?json={"ttop":50,"category":"news","include_etop":true,"target":"","SS":"fa","wc":0,"notes":"","sessionKey":"ag9zfmRzc3BwMjAxMS1ocmRyFwsSCkxDQ1Nlc3Npb24YgICAoK2_mAoM","format":"xml","minWeight":0,"userGuid":"44064767-a6ef-4c70-9536-cf196ee6794a","type":"2","text":"","minStrength":0,"current":"' + answerInput + '","guid":"ea8308d1-f93c-457d-84c8-1fa4457c7148","include_ttop":true,"minRankby":0,"etop":10,"domain":"nodomain"}';
//     // console.log(pathstring);
//     // var pathstring = '/lcc?json={"ttop":50,"category":"news","include_etop":true,"target":"","SS":"fa","wc":0,"notes":"","sessionKey":"ag9zfmRzc3BwMjAxMS1ocmRyFwsSCkxDQ1Nlc3Npb24YgICAoK2_mAoM","format":"xml","minWeight":0,"userGuid":"44064767-a6ef-4c70-9536-cf196ee6794a","type":"2","text":"","minStrength":0,"current":"bad%20diesease","guid":"ea8308d1-f93c-457d-84c8-1fa4457c7148","include_ttop":true,"minRankby":0,"etop":10,"domain":"nodomain"}';
//     // console.log(pathstring);
//
//     var options = {
//       host: 'dsspp.skoonline.org',
//       path: pathpath
//     };
//
//     callback = function(response) {
//       var str = '';
//
//       //another chunk of data has been recieved, so append it to `str`
//       response.on('data', function (chunk) {
//         str += chunk;
//       });
//
//       //the whole response has been recieved, so we just print it out here
//       response.on('end', function () {
//           var parseString = xml2js.parseString;
//           parseString(str, function(err, results) {
//               cc = results['lcc']['CC'];
//               ct = results['lcc']['CT'];
//               r_old = results['lcc']['RO'];
//               r_new = results['lcc']['RN'];
//               irr_old = results['lcc']['IO'];
//               irr_new = results['lcc']['IN'];
//               console.dir(results);
//               console.log("CC ============= " + cc);
//               console.log("CT ============= " + ct);
//               console.log("RO ============= " + r_old);
//               console.log("RN ============= " + r_new);
//               console.log("IO ============= " + irr_old);
//               console.log("IN ============= " + irr_new);
//           });
//           console.log(str);
//       });
//     }
//
//     http.request(options, callback).end();
//
//     session.send("Hello World");
// });
