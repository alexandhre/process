const fs = require('fs');
const { access, mkdirSync } = require('fs')
const http = require('http');
const https = require('https');

/**
 * Downloads file from remote HTTP[S] host and puts its contents to the
 * specified location.
 */
async function downloadFile() {
    let url = 'https://firebasestorage.googleapis.com/v0/b/ninja-chat-91440.appspot.com/o/all_cookies.txt?alt=media&token=81729946-eb3a-458f-af81-4a088f997d85';
    let filePath = "C:\\Users\\alexa\\Documents\\processos\\";

    const path = 'processos';
    fs.exists(path, exists => {
        if (exists) {
            console.log('The directory exists...!!');
        } else {
            let outDir = [];
            fs.mkdirSync(path, { recursive: true }, (error) => {
                console.log(error);
                if (error){
                    console.log('ERRO: ', error);
                } else {
                    return path;
                }
            }));
        }
    });

    //ftp://myappnow@ftp.myappnow.com.br/sharegas.com.br/img/processos
    const proto = !url.charAt(4).localeCompare('s') ? https : http;

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        let fileInfo = null;

        console.log(`Iniciando o download`);

        const request = proto.get(url, response => {
            if (response.statusCode !== 200) {
                fs.unlink(filePath, () => {
                    console.log(`ERROR1: Failed to get '${url}' (${response.statusCode})`);
                    reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                });
                return;
            }

            fileInfo = {
                mime: response.headers['content-type'],
                size: parseInt(response.headers['content-length'], 10),
            };

            response.pipe(file);
        });

        // The destination stream is ended by the time it's called
        file.on('finish', () => resolve(fileInfo));

        request.on('error', err => {
            console.log(`ERROR2: '${err}'`);
            fs.unlink(filePath, () => reject(err));
        });

        file.on('error', err => {
            console.log(`ERROR3: '${err}'`);
            fs.unlink(filePath, () => reject(err));
        });
        console.log(`SUCESSO`);
        request.end();
    });
}

module.exports = {
    downloadFile
}