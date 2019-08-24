let express = require('express');
let ejs = require("ejs");
let bodyParser = require('body-parser');
let app = express();

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static("img"));
app.use(express.static("css"));

app.use(bodyParser.urlencoded({
    extended: false
}));

let tasks = [];
addTask("Task1", "7/9/2019", "Build new Module");


app.get("/", function(req,res) {
    res.render("index.html");
});

app.get("/newtask", function(req,res) {
    res.render("newtask.html");
});

app.get("/listtasks", function(req,res) {
    res.render("tasklist.html", {tasks: tasks});
});

app.post("/add", function(req,res) {
    let taskName = req.body.taskName;
    let taskDue = req.body.taskDue;
    let taskDesc = req.body.taskDesc;

    addTask(taskName, taskDue, taskDesc);

    res.render("newtask.html");
});

function addTask(nameAdd, dueAdd, descAdd) {
    tasks.push({name: nameAdd, due: dueAdd, desc: descAdd})
    console.log(tasks);
}

app.listen(8080);