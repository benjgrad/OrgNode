/**
 * Created by bengrady4 on 2017-01-30.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'OrgNode', success: false, errors: req.session.errors, failed_attempts: req.session.failed_attempts });
    req.session.errors = null;
});
router.post('/submit', function(req, res, next){
    // Check Validity of the inputs
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is too short').isLength({min: 8});
    req.check('password', 'Passwords do not match').equals(req.body.confirm_password);

    var errors = req.validationErrors();
    var attempts = req.session.failed_attempts;
    if (errors){
        req.session.errors = errors;
        if (attempts){
            attempts++;
        }
        else{
            attempts=1;
        }
        req.session.failed_attempts=attempts;
        res.redirect('/signup');

    }
    else {
        req.session.errors = null;
        req.session.failed_attempts=null
        res.redirect('/');
    }

});

module.exports = router;
