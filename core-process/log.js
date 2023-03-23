const fs = require('fs');
const pathDirectory = `C:\\Inetpub\\vhosts\\myappnow.com.br\\process.myappnow.com.br\\process\\log`;

async function logEntries(message) {
    const filename = `${await getCurrentDate()}.txt`;
    if (fs.existsSync(pathDirectory + filename)) {
        fs.appendFile(pathDirectory, message + '\n', err => {
            if (err) {
                this.logEntries("Erro ao escrever em arquivo já existente de log:" + err);
                return "Erro ao escrever em arquivo já existente de log:" + err;
            }
        });
    } else {
        fs.appendFile(pathDirectory + '\\' + filename, message + '\n', err => {
            if (err) {
                this.logEntries("Erro ao escrever em arquivo recentemente criado de log:" + err);
                return "Erro ao escrever em arquivo recentemente criado de log:" + err;
            }
        })
    }
}

async function createDirectory() {
    if (!fs.existsSync(pathDirectory )) {
        fs.mkdir(pathDirectory, (err) => {
            if (err) {
                this.logEntries("Deu ruim a criação do diretório: " + err);
                return;
            }
            this.logEntries("Diretório criado");
        });
    }
}

async function getCurrentDate() {
    var moment = require('moment');
    const currentDate = moment().format("YYYYMMDD");
    return currentDate;
}

module.exports = {
    logEntries,
    createDirectory
}