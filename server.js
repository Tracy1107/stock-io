const express = require('express');
// const hero = require('./router/hero')  未完成
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

// 連接database
  var db = mongoose.connect('mongodb://localhost:27017/myDbs');

// 这里的myDbs是数据库的名字，不是表的名字



const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api',hero)
app.listen(3000,() => {
    console.log('Server running on port 3000.')
})


