var express = require('express');
var app = express();

// process.env.PWD = process.cwd();

console.log(process.env.PWD);
console.log(__dirname);

app.use(express.static(process.env.PWD + '/dist/prod'));

app.listen(process.env.PORT || 3000);