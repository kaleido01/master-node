const http = require("http");

const server = http.createServer((req, res) => {
	const url = req.url;
	const method = req.method;
	if (url === "/") {
		res.setHeader("Content-Type", "text/html");
		res.write("<html>");
		res.write("<head><Title>My first Page</Title></head>");
		res.write("<body><h1>Hello my node.js Server!</h1>");
		res.write("<ui><li>user1</li></ui>");
		res.write(
			"<form action='/create-user' method='POST'><input type='text'name='message' ><button type='submit'>send</button></input></form></body>"
		);
		res.write("</html>");
		return res.end();
	}

	if (url === "/create-user" && method === "POST") {
		const body = [];

		req.on("data", chunk => {
			body.push(chunk);
		});

		req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString();
			const message = parsedBody.split("=")[1];
			console.log(message);
		});
		res.statusCode = 302;
		res.setHeader("Location", "/");
		res.end();
	}
});

server.listen(3000);
