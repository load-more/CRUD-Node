var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', express.static('public'))
app.use('/node_modules', express.static('node_modules'))

app.engine('html', require('express-art-template'))

var router = require('./router')
// 将router挂载到app中
app.use(router)

app.listen(3000, () => {
  console.log('app is running at port 3000');
})