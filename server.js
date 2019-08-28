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
tasks.push({name: "Task1", due: "1/9/2019", desc: "Get week 5 lab marked."});


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
    tasks.push(req.body);

    res.render("newtask.html");
});

app.listen(8080);