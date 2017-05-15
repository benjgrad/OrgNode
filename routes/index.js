var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var orgnodelogger = require('../models/logger');
var path = require('path');
var elasticsearch = require('../models/elasticsearch');
var esclient =  require('../models/esconnection');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    var esdata = new Object();
    var user;
    if (req.user!= undefined) {
        user=req.user.username;
    }else {
        user = "null";
    }
    esclient.search(elasticsearch.findByUser(user)).then(function (body) {
        var results = body.hits.hits;
        for (i = 0; i < results.length; i++) {
            esdata[i] = results[i]._source;
        }
        console.log(orgnodelogger.datefile(path.basename(__filename)) + "findByUser\tuser: " + user + "\tresponse:");
        console.log(esdata);
        console.log(esdata[1].Task_ID);
        res.render('index', {   title: 'OrgNode', user: req.user, tasklist: esdata});
    }, function (error) {
        console.log("error: ");
        console.log(error.message);
        res.render('index', {   title: 'OrgNode', user: req.user, tasklist: esdata});
    });
});

router.post('/addEvent', function(req, res, next) {
    elasticsearch.addTask(req.body, req.user);
    res.redirect(req.headers.referer);
});

router.get('/register', function(req, res) {
    res.render('register', { user : req.user });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});



module.exports = router;