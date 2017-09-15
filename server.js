var express = require('express');
var app = express();

// process.env.PWD = process.cwd();

console.log(process.env.PWD);
console.log(__dirname);

app.use(express.static(__dirname + '/dist/prod'));
app.use(express.static(__dirname + '/dist/prod/assets'));
app.use(express.static(__dirname + '/dist/prod/js'));
app.use(express.static(__dirname + '/dist/prod/css'));

app.listen(process.env.PORT || 3000);