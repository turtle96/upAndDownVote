var express = require('express');
var app = express();

console.log(process.env.PWD + '/dist/prod/');
console.log(__dirname);

process.env.PWD = process.cwd();

app.use(express.static(process.env.PWD + '/dist/prod'));

app.listen(process.env.PORT || 3000);