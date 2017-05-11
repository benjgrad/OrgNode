var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var elasticsearch = require('../models/elasticsearch');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    var esdata = null;
    if (req.user!= undefined) {
        console.log(req.user.username);
        esdata = elasticsearch.findByUser(req.user.username);
        res.render('index', {   title: 'OrgNode', user: req.user, tasklist: esdata});
    }else {
        var nuluser = null;
        console.log("No user specified");
        esdata = elasticsearch.findByUser(nuluser);
        console.log("the data has been returned");
        console.log(esdata);
        res.render('index', {   title: 'OrgNode', user: req.user, tasklist: esdata});
    }
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