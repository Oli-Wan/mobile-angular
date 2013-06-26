var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/app'));
app.use("/test", express.static(__dirname + '/test'));
app.listen(3000);
console.log('Listening on port 3000...');