const express = require('express');
const Blog = require("../models/blog")
const router = express.Router();

router.get("/add-blog", (req, res)=>{
	const blog = new Blog({
		title:'new blog',
		snippet:'new snippet',
		body:'new body'
	});
	blog.save()
		.then((result)=>{
			res.send(result)
		})
		.catch(err=>{
			console.log(err)
			res.send(err);
		})
});

router.get("/all-blogs", (req, res)=>{
	Blog.find()
		.then(data=>{
			res.send(data)
		})
		.catch(err=>{
			console.log(err);
		})
})

router.get("/single-blog", (req, res)=>{
	Blog.findById("5f063efc29124a169baee864")
		.then(result=>{
			res.send(result);
		})
		.catch(err=>{
			console.log(err);
		})
})


router.get('/', (req, res)=>{
	Blog.find().sort({createdAt: -1})
		.then(blogs =>{
			res.render('index', {title:'all blogs', blogs})
		})
		.catch(err=>{
			console.log(err)
		})
})

router.post('/', (req, res)=>{
	console.log(req.body);
	const blog = new Blog(req.body);
	blog.save()
		.then( () =>{
			res.redirect("/blogs");
		})
		.catch( err => {
			console.log(err);
		})
})

router.get('/create', (req, res)=>{
	res.render('create', {title: 'create'})
})

router.get("/:id", (req, res)=>{
	const id = req.params.id;
	console.log(id)
	Blog.findById(id).then(blog => {
		res.render("details", {title: 'Blog Details', blog})
	}).catch(err=>{
		console.log(err);
	})
})

router.delete("/:id", (req, res) =>{
	const id = req.params.id;
  console.log(id)
  Blog.findByIdAndDelete(id).then(result=>{
		res.json({redirect: "/blogs"})
	}).catch(err=>{
		console.log(err)
	})
})


module.exports = router;

