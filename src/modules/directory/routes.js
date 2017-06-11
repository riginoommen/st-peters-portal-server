var express = require('express');
var router = express.Router();

// Test API 
router.get('/welcome_api', function(req, res, next) {
	res.json( { message: 'Hello St Peters. This is a test api' });
});

module.exports = router;
