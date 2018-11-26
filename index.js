const express = require("express");
const app = express(); // Initialiser un serveur

const axios = require("axios");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Import de body-parser

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/todo-API", // process.env.MONGODB_URI ||
  { useNewUrlParser: true, useCreateIndex: true }
); // Import de mongoose et connection à une database

const TaskModel = mongoose.model("Task", {
  description: { type: String, unique: true },
  status: { type: String, default: "todo" }
});

app.post("/create", function(req, res) {
  const newTask = new TaskModel(req.body);
  newTask.save(function(err, createdTask) {
    if (err) {
      res.json({ error: err.message });
    } else {
      res.json(createdTask);
    }
  });
});

app.post("/update", function(req, res) {
  TaskModel.findOne({ description: req.body.description }).exec(function(
    err,
    taskToUpload
  ) {
    if (err) {
      res.json({ error: err.message });
    } else {
      if (taskToUpload.status === "todo") {
        taskToUpload.status = "done";
        taskToUpload.save(function(err, uploadedTask) {
          if (err) {
            res.json({ error: err.message });
          } else {
            res.json(uploadedTask);
          }
        });
      } else if (taskToUpload.status === "done") {
        taskToUpload.status = "todo";
        taskToUpload.save(function(err, uploadedTask) {
          if (err) {
            res.json({ error: err.message });
          } else {
            res.json(uploadedTask);
          }
        });
      }
    }
  });
});

app.post("/delete", function(req, res) {
  TaskModel.deleteOne({ description: req.body.description }, function(err) {
    if (err) {
      res.json({ error: err.message });
    } else {
      res.json({ message: "This task has been deleted" });
    }
  });
});

app.get("/", function(req, res) {
  TaskModel.find().exec(function(err, myTask) {
    if (err) {
      res.json({ error: err.message });
    } else {
      res.json(myTask);
    }
  });
});

// Démarrer le serveur
const port = 3000;
// process.env.PORT ||
app.listen(port, function() {
  console.log("Server started");
});
