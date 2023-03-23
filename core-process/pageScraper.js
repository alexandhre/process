const logEntries = require('./log');

const scraperObject = {
	url: 'https://pje1g.trf1.jus.br/pje/login.seam?loginComCertificado=false',
	async scraper(browser){
        console.log('PageScraper');
        // var moment = require('moment');
        // logEntries.logEntries(moment().format("YYYY-MM-DDT23:59:00.000[Z]"));
        // logEntries.createDirectory();
		// let page = await browser.newPage();
        // logEntries.logEntries(`Navigating to ${page.url()}...`);

        // // Configure the navigation timeout
        // await page.setDefaultNavigationTimeout(0);

        // //goto page
		// await page.goto(page.url);

        // //console.log(cookies);
        // // Login
        // await page.type('#username', "02375696557");
        // await page.type('#password', "A16192508m");
        // await page.click('#btnEntrar');
        // await page.waitForNavigation();

        // const cookies2 = await page.cookies();
        // //console.log(cookies2);        
        // await page.setCookie(...cookies2);

        // // Configure the navigation timeout
        // await page.setDefaultNavigationTimeout(0);

        // //goto page
        // await page.goto('https://pje1g.trf1.jus.br/pje/Processo/ConsultaProcesso/listView.seam', {
        //     waitUntil: 'load',
        //     // Remove the timeout
        //     timeout: 0
        // });
        // logEntries.logEntries("-------------------------------------------------------------------------------");
        // logEntries.logEntries(`Navigating to ${page.url()}...`);
        // logEntries.logEntries("-------------------------------------------------------------------------------");
        // logEntries.logEntries(`Downloading the file...`);
        // logEntries.logEntries("-------------------------------------------------------------------------------");
        // //let downloadInstance = download.downloadFile();
	}
}

module.exports = scraperObject;