///<referance path="typings/tsd.d.ts"/>
"use strict";
//Import Libraries.
const express = require('express');
var mongoose = require('mongoose');
//Mongoose Connection.
mongoose.connect('mongodb://localhost/Sample');
//Express Instance.
var app = express();
//Server Configuration.
var port = process.env.PORT | 3005;
var server = app.listen(port, function () {
    var listening_port = server.address().port;
    console.log(`Listening on : ${listening_port}`);
});
//Creating Mongodb Schemas.
var personSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    age: Number,
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }]
});
var storySchema = new mongoose.Schema({
    _creater: [{ type: Number, ref: 'Person' }],
    title: String,
    fans: [{ type: Number, ref: 'Person' }]
});
//Creating Mongodb Models.
var Person = mongoose.model('Person', personSchema);
var Story = mongoose.model('Story', storySchema);
//Querying and Populating.
Story.find({ "title": "WitchCraft" }).populate('_creater')
    .exec(function (err, story) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(story);
    }
});
