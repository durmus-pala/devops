var express = require('express');
var os = require("os");
var dns = require("dns");

var app = express();
var hostname = os.hostname();
var platform = os.platform();
var uptime = os.uptime();
var interfaces = os.networkInterfaces();
var dnsServers = dns.getServers();

app.use(express.static('static'));

app.get('/', function (req, res) {
    var addresses = "";
	for (var i in interfaces) {
		for (var j in interfaces[i]) {
			if (i != "lo") {
				addresses += interfaces[i][j].address + ", ";			
			}
		}
	}
	addresses = addresses.substring( 0, addresses.length - 2 );
  res.send('<html> \
    <head> \
	    <meta charset="UTF-8"> \
	    <title>Project - Docker Container Info Demo</title> \
	    <link href="style/cw_style.css" rel="stylesheet" type="text/css"> \
    </head> \
    <body> \
        <div><img src="https://clarusway.com/wp-content/uploads/2020/06/clarusway_logo.png" /></div> \
	<h2>Project - Docker Container Info Demo<h2> \
        <h3>Container Info v1.0</h3> \
        <p>Host:' + hostname + '</p> \
	<p>Running OS:</span><span class="value">' + platform + '</p> \
	<p>Uptime:</span><span class="value">' + uptime + '</p> \
	<p>Network Information:</span><span class="value">' + addresses + '</p> \
	<p>DNS Servers:</span><span class="value">' + dnsServers + '</p> \
	<p class="footnote"><i>This app is developed by <b>DevOps Team</b>.</i></p> \
    <body/> \
</html>');
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
