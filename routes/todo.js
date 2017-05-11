var express = require('express');
var router = express.Router();

/* GET To do page. */
router.get('/', function(req, res, next) {
    res.render('todo', { title: 'OrgNode' });
});

module.exports = router;
