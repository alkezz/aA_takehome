const express = require('express')
const cors = require('cors')
const { Sequelize } = require('sequelize')
const { Coffee, Post } = require('./models')

const app = express()
const sequelize = new Sequelize('database_development', 'root', 'password', {
    host: '127.0.0.1',
    dialect: 'sqlite'
})
const corsOptions = {
    origin: 'http://localhost:3000'
};


app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))

sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Unable to sync database:', err);
});

app.get('/coffee', async (req, res) => {
    const coffees = await Coffee.findAll({
        order: [['name', 'ASC']]
    })
    res.status(200).json(coffees)
})
app.get('/post', async (req, res) => {
    const posts = await Post.findAll({
        order: [['createdAt', 'ASC']]
    })
    res.status(200).json(posts)
})
app.get('/coffee/ping', async (req, res) => {
    res.json({ 'status': 'good' })
})
app.get('/post/ping', async (req, res) => {
    res.json({ 'status': 'good' })
})
app.get('/coffee/:coffeeId', async (req, res) => {
    const oneCoffee = await Coffee.findByPk(req.params.coffeeId)
    res.status(200).json(oneCoffee)
})
app.get('/post/:postId', async (req, res) => {
    const onePost = await Post.findByPk(req.params.postId)
    res.status(200).json(onePost)
})

app.post('/coffee/create', async (req, res) => {
    const { name, year, caffine_content, caffine_percentage } = req.body
    const newCoffee = await Coffee.create({
        name,
        year,
        caffine_content,
        caffine_percentage
    })
    if (newCoffee) {
        res.json(newCoffee)
    } else {
        res.status(500).json({ "Error": "Invalid Coffee" })
    }
})
app.post('/post', async (req, res) => {
    const { title, coffee, text, rating } = req.body
    const newPost = await Post.create({
        title,
        coffee,
        text,
        rating
    })
    if (newPost) {
        res.status(201).json(newPost)
    } else {
        res.status(500).json({ "Error": "Couldn't create post" })
    }
})
app.delete('/coffee/delete/:coffeeId', async (req, res) => {
    const oldCoffee = await Coffee.findByPk(req.params.coffeeId)
    if (oldCoffee) {
        oldCoffee.destroy()
        res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        res.status(404).json({
            message: "Coffee couldn't be found",
            statusCode: 404
        })
    }
})
app.delete('/post/:postId', async (req, res) => {
    const oldPost = await Post.findByPk(req.params.postId)
    if (oldPost) {
        oldPost.destroy()
        res.status(201).json({ "Message": "Successfully deleted Post" })
    } else {
        res.status(404).json({ "Error": "Post was not found" })
    }
})

app.listen(5000, () => {
    console.log('Server running on port 5000')
})
