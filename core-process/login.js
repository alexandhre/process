const https = require('https');
const scparser = require("set-cookie-parser");

async function dologin(email, password) {
    //GET login page
    const getLogin = await get_login();
    //get necessary info from response
    const jsessionid = scparser
        .parse(getLogin.headers, { decodeValues: false })
        .find((cookie) => cookie.name == "JSESSIONID").value;
    console.log("jsessionid: " + jsessionid);

    //recuperar servidor 
    const server = jsessionid.split(".");
    console.log("server: " + server[1]);

    //POST login data
    const postLogin = await post_login(email, password, jsessionid, server[1]);
   
    const jsessionid2 = scparser
        .parse(postLogin['set-cookie'] , { decodeValues: false })
        .find((cookie) => cookie.name == "JSESSIONID").value;
    console.log("jsessionid2: " + jsessionid2);

    //recuperar servidor 
    const server2 = jsessionid2.split(".");
    console.log("server2: " + server2[1]);

    //GET new csrf token from project page
    const projects = await get_page_process(jsessionid2, server2[1]);
    // const csrf2 = parser
    //     .parse(projects.html)
    //     .querySelector(`meta[name="ol-csrfToken"]`)
    //     .getAttribute("content");
    return 0;
    //return data
    return {
        session: session2,
        gclb: gclb,
        csrf: csrf2,
        projects: projects.html
    };
}

async function get_login() {
    const url = "https://pje1g.trf1.jus.br/pje/login.seam?loginComCertificado=false";
    return new Promise((resolve) => {
        https.get(url, (res) => {
            var data;
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                console.log("statusCodeGetLogin: ", res.statusCode);
                console.log("headersGetLogin: ", res.headers);
                resolve({ html: data, headers: res.headers['set-cookie'] });
            });
        });
    });
}

async function post_login(email, password, jsessionid, server) {
    const url = "https://pje1g.trf1.jus.br/pje/logar.seam";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://pje1g.trf1.jus.br",
            "Referer": "https://pje1g.trf1.jus.br/pje/login.seam?loginComCertificado=false",
        }
    }; 
    const postData = {
        username: "02375696557",
        password: "A16192508m",
        newPassword1: "",
        newPassword2: ""
    };
    return new Promise((resolve) => {
        var req = https.request(url, options, (res) => {
            resolve(res.headers);
            //console.log("res.headers: ", res);
            console.log("statusCodePostLogin: ", res.statusCode);
            console.log("headersPostLogin: ", res.headers);
        });

        req.on("error", (e) => {
            console.error("ERROR: " + e);
        });

        req.write(JSON.stringify(postData));
        req.end();        
    });
}

async function get_page_process(jsessionid, server) {
    const url = "https://pje1g.trf1.jus.br/pje/Processo/ConsultaProcesso/listView.seam";
    return new Promise((resolve) => {
        https.get(
            url,
            { headers: { Cookie: `MO=P; PJE-TRF1-1G-StickySessionRule=${server}:pje-trf1-1g; JSESSIONID=${jsessionid};` } },
            (res) => {
                var data;
                res.on("data", (chunk) => {
                    data += chunk;
                });
                res.on("end", () => {
                    resolve({ html: data, headers: res.headers });
                    console.log("statusCodeGetProcess: ", res.statusCode);
                    console.log("headersGetProcess: ", res.headers);
                });
            }
        );
    });
}

module.exports = {
	dologin
};