var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var rp = require('request-promise');
var Promise = require('promise');
var url = require('url');
var _ = require('underscore');
var start, finish;

var app = express();

var publicFolder = path.join(__dirname, 'public');

app.get('/stars', function( req, res ) {

	start = (new Date()).getTime();
	var urlBase = "https://in-the-sky.org/newscalyear.php?year=2016&maxdiff=7#datesel&country=240&reg1=3596&reg2=0&town=16129"

	function getMainObject( html ){

		var $ = cheerio.load(html);
		var $linksEvents = $(".stripy td a");
		var eventsStars = [];

		console.log ("🌟 " + $linksEvents.length + " star events parsing in progress...");

		$linksEvents.each(function(index, elem) {

				var $linkEvent = $(elem);

				var title = $(elem).text();
				var linkDetails = $(elem).attr("href");
				var id = linkDetails.split("?id=").pop();
				eventsStars.push({
					originId: id,
					name : title,
					link : linkDetails + '&country=240&reg1=3596&reg2=0&town=16129'
				})


		})

		// eventsStars = eventsStars.slice(150);

		return eventsStars;
	}

	function getDetails( aStarEvents ){

		var links = aStarEvents.reduce(function(acc, item, i){
			acc.push(item.link);
			return acc;
		},[]);

		var promises = links.map(function(urlLink, i) {
			var oUrl = url.parse(urlLink);
			var options = {
			    url: urlLink,
			    simple: false,
			    headers: {
			       'Host': oUrl.host
			    }
			}

			return rp(options);
		})
		return Promise.all(promises)
			.then(function (dataPromises) {

				var additionalData = [];

				dataPromises.forEach( function( html, i) {

					var $ = cheerio.load(html);
					
					var $firstP = $(".newsbody > p:first-of-type");
					var $otherP = $(".newsbody > p:first-of-type").nextUntil('div, h2', 'p');

					var aDesc = [];
					
					var firstP = $($firstP).text();
					if(firstP.indexOf('Washington') === -1 && firstP.indexOf('as follows:') === -1 && firstP.indexOf('will be:') === -1 && content.indexOf('Click here') === -1 ){
						aDesc.push( firstP );
					}
					$otherP.each(function(i, p){
						var content = $(p).text();
						var notClick = content.indexOf('Click here') === -1;
						var notLocation = content.indexOf('Washington') === -1 && content.indexOf('United States') === -1;
						var notListTitle = content.indexOf('as follows:') === -1 && content.indexOf('will be:') === -1;
						if(notLocation && notListTitle && notClick){
							aDesc.push( content );
						}						
					});

					var fullDate = $('.widetitle').next('.hidden-xs-down').next('table, p').text();
					date = fullDate.split('(');
					date = date.shift();
					var time = '';
					if(fullDate.indexOf(' at') !== -1){
						date = date.split(' at').shift();
						time = fullDate.split(' at');
						time = time.pop().split('(').shift();	
					}					
					date = new Date (date + ' ' + time);
					var timestamp = date.getTime();

					var visibilityImg = $('.widetitle').next('.hidden-xs-down').find('img').attr('src');

					var visibility = 'Not visible';

					if(visibilityImg){
						var visibilityImgSrc = visibilityImg.split('/').pop();
						visibility = visibilityImgSrc;
						
						if (visibilityImgSrc === 'level1_icon.png'){
							visibility = 'Visible to the naked eye';
						} else if (visibilityImgSrc === 'level2_icon.png'){
							visibility = 'Visible with binoculars';
						} else if (visibilityImgSrc === 'level3_icon.png' || visibilityImgSrc === 'level4_icon.png' || visibilityImgSrc === 'level5_icon.png' ){
							visibility = 'Visible with telescope';
						} else {
							visibility = 'Not visible';
						}
					}
					
					

					var feed = $('.mainpane .condensed a').attr('href').split('?feed=').pop();

					var category = [];

					if(feed === 'deepsky' || feed === 'conjunctions' || feed === 'innerplanets' || feed === 'dwarfplanets' || feed === 'outerplanets'){
						category.push('Stars and planets')
					} else if (feed === 'moon'){
						category.push('Moon')
					} else if (feed === 'meteors'){
						category.push('Meteor showers')
					} else if (feed === 'eclipses'){
						category.push('Eclipses')
					} else if (feed === 'comets' || feed === 'asteroids'){
						category.push('Comets and asteroids')
					} else if (feed === 'earth'){
						category.push('Earth')
					}

					var title = $('.mainpane .widetitle').text();
					if(title.indexOf('Conjunction between the Moon') !== -1 ){
						category.push('Moon')
					}

					additionalData.push ( {
						description: aDesc,
						date: timestamp,
						category: category,
						visibility: visibility,
						
					});
				})
				return additionalData;
			})
			.then(function( additionalData ) {

				additionalData.forEach(function(oData,i) {
					_.extend( aStarEvents[i], oData)
				})
				return aStarEvents;
			})

	}

	function returnJson( data ) {

		var currentTime = (new Date()).getTime();
		var spentTime = currentTime-start;

		var totalSec = spentTime / 1000;
		var hours = parseInt( totalSec / 3600 ) % 24;
		var minutes = parseInt( totalSec / 60 ) % 60;
		var seconds = totalSec % 60;

		console.log ("🕐 parsing time = " + minutes + ":" + seconds)


		res.json(data);
	}

	rp(urlBase)
		.then ( getMainObject )
		.then ( getDetails )
		.then ( returnJson )
		.catch( function(error) {
			console.log ("⚡️ Ups!!")
			console.log (error)
		})


})

app.use( express.static(publicFolder) );

app.listen(process.env.PORT || '8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;