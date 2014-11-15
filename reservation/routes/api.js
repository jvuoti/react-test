var express = require('express');
var path = require('path');
var _ = require('underscore');
var Datastore = require('nedb');

var router = express.Router();
var db = {};

db.citiesByCountry = new Datastore({
	filename: path.join(__dirname, '../data/citiesByCountry.db'),
	autoload: true
});

// TODO: add CRUD support for adding new cities and data
var addCityByCountry = function(country, city) {
	db.citiesByCountry.update({country: country}, {$push: {cities: city}}, {upsert: true}, function(err) {
		if(err){
			console.error(err);
		} else {
			console.log("Added city '%s' for country '%s'.", city, country);
		}
	})
};

addCityByCountry("Finland", "Helsinki");
addCityByCountry("Finland", "Tampere");
addCityByCountry("Finland", "Oulu");
addCityByCountry("Finland", "Turku");
addCityByCountry("Sweden", "Stockholm");
addCityByCountry("Sweden", "Gothenburg");
addCityByCountry("Sweden", "Visby");

router.get('/cityData', function(req, res) {
	db.citiesByCountry.find('', function(err, countries) {
		if (err || !countries) {
			console.log("No countries found");
			res.sendStatus(500);
		} else {
			res.json(_.map(countries, function(c){
				return {
					country: c.country, 
					cities: c.cities
				};
			}));
		}
	});	
});

router.post('/reserve', function(req, res) {
	console.log(req.body);
	res.sendStatus(200);
});

module.exports = router;