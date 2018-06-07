const mongoose = require('mongoose')

const testSchema = mongoose.Schema({
  id: String,
  name: String,
  category: String,
  stock: String,
  safetyStock: String,
  unit: String,
  checkDate: Date,
  checkPerson: String,
  checkStock: Number
}, { collection: 'mytest' })
// 这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据

const DataModel = module.exports = mongoose.model('test', testSchema)
