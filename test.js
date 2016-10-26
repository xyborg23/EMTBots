var http = require('http');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'dsspp.skoonline.org',
  path: '/lcc?json={"ttop":50,"category":"news","include_etop":true,"target":"","SS":"fa","wc":0,"notes":"","sessionKey":"ag9zfmRzc3BwMjAxMS1ocmRyFwsSCkxDQ1Nlc3Npb24YgICAoK2_mAoM","format":"xml","minWeight":0,"userGuid":"44064767-a6ef-4c70-9536-cf196ee6794a","type":"2","text":"","minStrength":0,"current":"bad%20disease","guid":"ea8308d1-f93c-457d-84c8-1fa4457c7148","include_ttop":true,"minRankby":0,"etop":10,"domain":"nodomain"}'
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