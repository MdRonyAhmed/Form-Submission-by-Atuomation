const axios = require("axios")
const cheerio = require("cheerio");


(async () => {

    console.log("Start");

    await axios.get("https://opensource-demo.orangehrmlive.com/index.php/auth/login", {
        headers: {

            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 Edg/90.0.818.42",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9",
            "Content-Type": "multipart/form-data",
            "Cache-Control": "max-age=0",
            "Content-Type": "application/x-www-form-urlencoded",
            connection: "alive",
        }
    })
        .then(async res => {

            const cookies = (res["headers"])["set-cookie"][0];
            const cookie = (cookies.split(";"))[0];
            console.log("Cookie: ", cookie);


            let $ = cheerio.load(res["data"]);
            await $("#csrf_token");

            const tag_csrf = $('input[name= "_csrf_token"]');
            const csrf_token = tag_csrf.attr("value");

            await console.log("CSRF Token: ", csrf_token);

            data = {
                "actionID": "",
                "hdnUserTimeZoneOffset": 6,
                "installation": "",
                "_csrf_token": csrf_token,
                "txtUsername": "Admin",
                "txtPassword": "admin123",
                "Submit": "LOGIN"
            };


            await axios.post("https://opensource-demo.orangehrmlive.com/index.php/auth/validateCredentials", data, {
                headers: {

                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 Edg/89.0.774.77",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Content-Type": "multipart/form-data",
                    "Cache-Control": "max-age=0",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "connection": "keep-alive",
                    "Cookie": "Loggedin=True; " + cookie,
                    'X-CSRFToken': csrf_token,
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Upgrade-Insecure-Requests": 1,
                    "Origin": "https://opensource-demo.orangehrmlive.com"

                }
            })


                .then((response) => {
                    console.log(response);

                })
                .catch(err => {
                    console.log(err);
                })
        })

        .catch(err => {
            console.log(err);
        })


})();
