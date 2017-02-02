var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Welcome to your smart todo!')
})

app.listen(8080)