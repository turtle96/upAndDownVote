var express = require('express');
var app = express();
app.use(express.static(process.env.PWD + '/dist/prod/'));

app.listen(process.env.PORT || 3000);