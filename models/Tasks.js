
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var TasksSchema = new Schema({

 name:{
 type:String,
 require:true
 },
 startTime:{
  type:Date,
  default:Date.now()
 },
 endTime:{
  type:Date
 } 


});


module.exports = mongoose.model('tasks', TasksSchema);


