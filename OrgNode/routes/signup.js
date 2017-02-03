/**
 * Created by bengrady4 on 2017-01-30.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'OrgNode', success: false, errors: req.session.errors });
    req.session.errors = null;
});
router.post('/submit', function(req, res, next){
    //TODO: Check Validity of the inputs
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is too short').isLength({min: 4});
    req.check('confirm_password', 'Passwords do not match').equals(req.body.confirm_password);

    var errors = req.validationErrors();
    if (errors){
        req.session.errors = errors;
        res.redirect('/signup');
    }
    else {
        res.redirect('/');
    }

});

module.exports = router;
