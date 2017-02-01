/**
 * Created by bengrady4 on 2017-01-30.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'OrgNode' });
});
router.post('/signup-submit', function(req, res, next){
    //TODO: Check Validity of the inputs
});

module.exports = router;
