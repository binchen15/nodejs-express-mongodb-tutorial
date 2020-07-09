const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes')

const dbURI = "mongodb://guest:test1234@ds263068.mlab.com:63068/node-tutorial-mongo"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => {
		console.log('mongodb connected! start listening')
		app.listen(3000)
	})
	.catch(err=> console.log(err))

// register template engine
app.set('view engine', 'ejs');
//app.set('views', 'views')

// move to mongoose connector
//app.listen(3000);

app.use((req, res, next)=>{
	console.log(`logger: ${req.url}`);
	next();
})

app.use((req, res, next)=>{
	console.log(`logger2: ${req.method}`)
	next();
})

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));

app.get("/", (req, res) => {
	res.redirect("/blogs")
	//res.send('<p>home page</p>');
	//res.sendFile("./views/index.html", {root: __dirname})
	const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
	res.render('index', { title: 'Home', blogs })
});



app.get("/about", (req, res)=>{
	//res.send('<p>about page</p>')
	res.sendFile("./views/about.html", {root: __dirname})
	res.render('about', { title: 'About' })
})

app.get('/about-us', (req, res)=>{
	res.redirect("/about");
})

app.use("/blogs", blogRoutes)


// 404 must be at the bottom
app.use((req, res) => {
	//res.status(404).sendFile('./views/404.html', {root: __dirname})
	res.status(404).render('404', {title: '404'})
})


