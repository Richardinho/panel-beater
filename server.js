var express = require('express');
var app = express();
app.use(express.static('dist'));
app.use(express.static('web'));
app.listen(7435, function () {
	console.log('listening on port 7435');
});