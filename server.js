const http = require("http"),
	app = require("./app");

const port = process.env.PORT || 4000,
	server = http.createServer(app);
server.listen(port);
