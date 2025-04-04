const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;

const myServer = http.createServer((req, res) => {
    if (req.url == "/favicon.ico") return res.end(); // return
    const myUrl = url.parse(req.url, true);
    const date = Date();
    const formattedDate = date.toString().split("GMT")[0];
    const log = `New ${req.method} request received on ${myUrl.path} route at ${formattedDate}\n`;
    fs.appendFile("server_logs.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
                if (req.method === "GET") res.end("Hi, welcome to Home page");
                break;
            case "/about":
                const userName = myUrl.query.username;
                if (userName) {
                    res.end(`Hi, welcome to About page, ${userName}`);
                } else {
                    res.end(`Hi, welcome to About page`);
                }
                break;
            case "/search":
                const search = myUrl.query.search_query;
                if (search) {
                    res.end(`Here are your results for ${search}.`);
                } else {
                    res.end('Hi, welcome to search page');
                }
                break;
            case "/signup":
                if (req.method === "GET") res.end("Welcome to signup form");
                else if (req.method === "POST") { // User is trying to signup.
                    // DB Query to put user data in the database.
                    res.end("Successfully signed up!");
                }
            default:
                res.end("404 - Not found");
                break;
        }
    });
});

myServer.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});