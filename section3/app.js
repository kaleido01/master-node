const http = require("http");

const server = http.createServer((req, res) => {
	console.log(req.url, req.method, req.headers);
	// process.exit()
	res.setHeader("Content-Type", "text/html");
	res.write("<html>");
	res.write("<head><Title>My first Page</Title></head>");
	res.write("<body><h1>Hello my node.js Server!</h1></body>");
	res.write("</html>");

	res.end();
});

server.listen(3000);
