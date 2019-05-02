const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
	console.log(req.url, req.method, req.headers);
	const url = req.url;
	const method = req.method;
	if (url === "/") {
		res.write("<html>");
		res.write("<head><Title>Enter Message</Title></Title></head>");
		res.write(
			"<body><form action='/message' method='POST'><input type='text'name='message' ><button type='submit'>send</button></input></form></body>"
		);
		res.write("</html>");

		return res.end();
	}
	// process.exit()
	if (url === "/message" && method === "POST") {
		fs.writeFileSync("message.txt", "DUMMY");
		res.statusCode = 302;
		res.setHeader("Location", "/");
		return res.end();
	}
	res.setHeader("Content-Type", "text/html");
	res.write("<html>");
	res.write("<head><Title>My first Page</Title></head>");
	res.write("<body><h1>Hello my node.js Server!</h1></body>");
	res.write("</html>");

	res.end();
});

server.listen(3000);
