var express = require('express');
var router = express.Router();

router.get('/cityData', function(req, res){
	var cityData = {
		"Finland": ["Helsinki", "Tampere", "Oulu"],
		"Sweden": ["Stockholm", "Gothenburg", "Visby"]
	};
	res.json(cityData);
});

router.post('/reserve', function(req,res){
	console.log(req.body);
	res.sendStatus(200);
});

module.exports = router;