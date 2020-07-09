const http = require('http');
const fs = require('fs');
const _ = require('lodash');

// callback run everytime
const server = http.createServer((req, resp) => {
	console.log('request made', req.url, req.method)

	const num = _.random(0,20);
	console.log(num);

	// set response header content type
	resp.setHeader('Content-Type', 'text/html');

	let path='./views/'
	switch(req.url) {
		case '/':
			path += 'index.html';
			resp.statusCode = 200;
			break;
		case '/about':
			path += 'about.html'
			resp.statusCode = 200;
			break;
		case '/about-me':
			//path += 'about.html'
			resp.statusCode = 301;
			resp.setHeader('Location', '/about');
			resp.end();
			break;
		default:
			path += '404.html'
			resp.statusCode = 404;
	}


	fs.readFile(path, (err, data)=>{
		if (err) {
			console.log(err)
		} else {
			resp.write(data);
			resp.end();
		}
	})

	//resp.write("<p>Hello World!</p>");
	//resp.write("<p>Hello World Again!</p>");
	//resp.end();

});

// callback run only once
server.listen(3000, 'localhost', ()=>{
	console.log('listen for requst on port 3000');
});
