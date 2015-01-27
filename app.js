
var restify = require("restify");

var server = restify.createServer();


var mongoose = require('mongoose');

// import models here

var Tasks = require("./models/Tasks");

mongoose.connection.on("connected", function() {
   console.log('successfully connected to mongodb');
   startServer();
});

 mongoose.connection.on("error", function(error) {
    console.log(error);
    console.log("check your configuration file, could not connect to db");
    process.exit();
});

mongoose.connect("mongodb://127.0.0.1:27017/tasksdb");


// Milldleware 

 var bodyParserOptions = {
    keepExtensions: true,
    mapFiles: true,
    rejectUnknown: false,
    overrideParams: true
  };

server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser(bodyParserOptions));

var createTask = function(req,res){

 var task = req.body.task;

 console.log(task);

 var handler = function(error, record){
 
  if(error || !record){
   res.send(new Error("Task could not be created"));
  }else{
   console.log("succefully added task to db and its id is -- "+ record._id);
   res.send(record);
  }

 }    

 Tasks.create(task, handler);
 //res.send(task);  
 

} 

server.post("/tasks", createTask);

var updateTask = function(req, res){

 console.log("executing updateTask"); 
 var taskid = req.params.id; 
 console.log("taskid from request is "+ taskid);
 
 var update = req.body.task; 

 console.log("updates to the task"+ update); 

 Tasks.findOne({_id:taskid}, function(error, task){
  
  if(!task || error){
  
   res.send(new Error("could not find task with id "+ taskid));
  }else{
   console.log("found task"+ task ); 
   task.endTime = update.endTime;
   task.save(function(err, updatedTask){

    res.send(updatedTask);
   });
  

  } 

 })
 

}

server.put("/tasks/:id", updateTask); 

var deleteTask = function(req,res){

}
server.del("/tasks/:id", deleteTask);

var getTaskDetail = function(req, res){
  
}
server.get("/tasks/:id", getTaskDetail);


var onListen = function(){
  console.log("tasks api server started");
}

var startServer = function(){

server.listen(3000, onListen);

}
