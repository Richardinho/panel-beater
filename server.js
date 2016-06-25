var express = require('express');
var app = express();
app.use(express.static('web2'));
app.listen(7435, function () {
	console.log('listening on port 7435');
});