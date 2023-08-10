const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geoCode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Velu"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: "Velu"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: "Velu"
    })
})


app.get('/weather', (req, res) => {
    const command = req.query.location
    if (!command) {
        return res.send({
            error: "Enter a location"
        })
    }

    geoCode(command, (error, { latitude, longitude, location }={}) => {

        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                location,
                forecastData,
                address: command
            })
        })
    })
    // res.send({
    //     forecast: 50,
    //     location: "nambiyur",
    //     address: req.query.location
    // })
})

app.get('/product', (req, res) => {
    if (!req.query.name) {
        return res.send({
            error: "enter a search term"
        })
    }
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', { error: 'My 404 page' }
    )
})


app.listen(3000, () => {
    console.log("Server is up on port 3000.");
})

