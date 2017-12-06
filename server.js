var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser')
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

//Arbitrary ID manager since we don't use a database
var index = 5;

var ideas = [{
    "id": 1,
    "name": "New issue tracking system",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
    "status" : "Idea",
    "owner" : "Jim"
}, {
    "id": 2,
    "name": "Revamp build scripts",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
    "status" : "Started",
    "owner" : "Jim"
}, {
    "id": 3,
    "name": "New phone triage",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
    "status" : "Mind Mapped",
    "owner" : "Jim"
}, {
    "id": 4,
    "name": "Implement containerization",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
    "status" : "POC",
    "owner" : "Joel"
}, {
    "id": 5,
    "name": "Migrate to oauth accounts",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
    "status" : "Exploratory",
    "owner" : "Jake"
}]

var message = "Thanks for visiting the app!  Our next hackathon is scheduled for the end of Q3.  We hope to see you there, be sure to add your ideas to the app!";

app.get('/messages', function (req, res) {
    res.end(JSON.stringify(message));
})

app.get('/ideas', function (req, res) {
    res.end(JSON.stringify(ideas));
})

app.get('/ideas/:id', function (req, res) {
    for (var i = 0; i < ideas.length; i++) {
        if(ideas[i].id == req.params.id){
            res.end(JSON.stringify(ideas[i]));
        }
    }
})

app.post('/ideas', function (req, res) {
    var newIdea = {
        "name": req.body.name,
        "description": req.body.description,
        "owner" : req.body.owner,
        "status": req.body.status,
        "id": index + 1
    }

    index++;

    ideas.push(newIdea);
    res.status(201).end(JSON.stringify(newIdea));
})

app.put('/ideas/:id', function (req, res) {
    var idea;
    for (var i = 0; i < ideas.length; i++) {
        if(ideas[i].id == req.params.id){
            ideas[i].name = req.body.name;
            ideas[i].owner = req.body.owner;
            ideas[i].description = req.body.description;
            ideas[i].isComplete = req.body.status;
            idea = ideas[i];
        }
    }

    res.end(JSON.stringify(idea));
})

app.delete('/ideas/:id', function (req, res) {
    for (var i = 0; i < ideas.length; i++) {
        if(ideas[i].id == req.params.id){
            ideas.splice(i, 1);
            res.status(204).end(JSON.stringify(ideas[i]));
        }
    }
});


var server = app.listen(9000, function () {
    var host = server.address().address
    var port = server.address().port
})