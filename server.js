#!/usr/bin/env node

import {playRPS, playRPSLS} from "./lib/rpsls.js"
import minimist from 'minimist'
import express from 'express'

var argv = minimist(process.argv.slice(2));
const port = argv.port || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/app/", (req, res, next) => {
    res.json({"message":"200 OK"});
	res.status(200);
});

app.get("/app/rps", (req, res, next) => {
    res.json(playRPS());
	res.status(200);
});

app.get("/app/rpsls", (req, res, next) => {
    res.json(playRPSLS());
	res.status(200);
});

app.get("/app/rps/play", (req, res, next) => {
    res.json(rps(req.query.shot));
	res.status(200);
});


app.get("/app/rpsls/play", (req, res, next) => {
    res.json(playRPSLS(req.query.shot));
	res.status(200);
});


app.post("/app/rps/play", (req, res, next) => {
    res.json(rps(req.body.shot));
	res.status(200);
});


app.post("/app/rpsls/play", (req, res, next) => {
    res.json(playRPSLS(req.body.shot));
	res.status(200);
});

app.get("/app/rps/play/:shot", (req, res, next) => {
    res.json(playRPS(req.params['shot']));
	res.status(200);
});


app.get("/app/rpsls/play/:shot", (req, res, next) => {
    res.json(playRPSLS(req.params.shot));
	res.status(200);
});


app.use(function(req, res){
	res.json({"message":"404 NOT FOUND"});
    res.status(404);
});