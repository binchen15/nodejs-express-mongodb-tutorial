const name = "mario";
console.log(name);

const interval = global.setInterval(()=>{
	console.log("hello")
}, 1000);

global.setTimeout(()=>{
	global.clearInterval(interval);
}, 5000)

console.log(__dirname);
console.log(__filename);

const fs = require('fs');
// asynchronous call
fs.readFile("text.txt", (err, data)=>{
	if (err) {
		console.log(err);
	}
	console.log(data.toString());
})
