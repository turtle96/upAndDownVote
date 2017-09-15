var express = require('express');
var app = express();

process.env.PWD = process.cwd();

console.log(process.env.PWD + '/dist/prod/');
console.log(__dirname);

app.use(express.static('.../dist/prod'));

app.listen(process.env.PORT || 3000);