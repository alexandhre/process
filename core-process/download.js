const https = require('https');

/**
 * Downloads file from remote HTTP[S] host and puts its contents to the
 * specified location.
 */
async function downloadFile() {
    let url = 'https://firebasestorage.googleapis.com/v0/b/ninja-chat-91440.appspot.com/o/all_cookies.txt?alt=media&token=81729946-eb3a-458f-af81-4a088f997d85';

    //const url = "https://sharegas.com.br/ws/api/download.php/dowloadFile";
    return new Promise((resolve) => {
        https.get(url, (res) => {
            var data;
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                console.log("statusCodeGetLogin: ", res.statusCode);
                console.log("headersGetLogin: ", res.headers);
                resolve({ html: data, headers: res.headers });
            });
        });
    });
}

module.exports = {
    downloadFile
}