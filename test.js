var http = require('http');
var xml2js = require('xml2js');

var options = {
  host: 'dsspp.skoonline.org',
  path: '/lcc?json={"ttop":50,"category":"news","include_etop":true,"target":"","SS":"fa","wc":0,"notes":"","sessionKey":"ag9zfmRzc3BwMjAxMS1ocmRyFwsSCkxDQ1Nlc3Npb24YgICAoK2_mAoM","format":"xml","minWeight":0,"userGuid":"44064767-a6ef-4c70-9536-cf196ee6794a","type":"2","text":"","minStrength":0,"current":"bad%20disease","guid":"ea8308d1-f93c-457d-84c8-1fa4457c7148","include_ttop":true,"minRankby":0,"etop":10,"domain":"nodomain"}'
};

var cc = "";
var ct = "";
var r_old = "";
var r_new = "";
var irr_old = "";
var irr_new =  "";
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
