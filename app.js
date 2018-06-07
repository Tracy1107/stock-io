//1.引入express模块
const express = require('express')
//2.创建app对象
const app = express()
//定义简单路由
app.use('/',(req,res) => {
  res.send('Yo!')
})
//定义服务启动端口
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})