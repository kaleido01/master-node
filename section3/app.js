const http = require("http");

const server = http.createServer((req, res) => {
	console.log(req.url, req.method, req.headers);
	const url = req.url;
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
	res.setHeader("Content-Type", "text/html");
	res.write("<html>");
	res.write("<head><Title>My first Page</Title></head>");
	res.write("<body><h1>Hello my node.js Server!</h1></body>");
	res.write("</html>");

	res.end();
});

server.listen(3000);
