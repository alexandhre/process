var express = require('express');
var router = express.Router();
var logEntries = require('../core-process/log');
var moment = require('moment');
const browserObject = require('../core-process/browser');
const scraperController = require('../core-process/pageController');

/* GET home page. */
router.get('/', function(req, res, next) {
  logEntries.logEntries(moment().format("YYYY-MM-DDT23:59:00.000[Z]"));
  //Start the browser and create a browser instance
  let browserInstance = browserObject.startBrowser();

  // Pass the browser instance to the scraper controller
  scraperController(browserInstance);
  res.render('index', { title: 'teste' });
});

module.exports = router;
