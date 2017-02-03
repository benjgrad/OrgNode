var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'OrgNode', success: false, errors: req.session.errors });
    req.session.errors = null;
});

router.post('/submit', function(req, res, next){
   //TODO: Check validity
});
module.exports = router;
