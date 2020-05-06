// Simple Experss Server
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Experss config
const publicDirectory = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup Handlebars engine and Views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

// Setup different routes for the Express Server
// Homepage
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Mayank Khanna"
    })
})

// About Page
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Mayank"
    })
})

// Help Page
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: "You can get any help, just Google it !",
        name: "Mayank Khanna"
    })
})

// Weather Page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "An address must be provided to get the weather."
        })
    }

    const address = req.query.address;
    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, {forecast, lastSeen} = {}) => {

            if (error) {
                return res.send({error})
            }

            res.send({
                location: location,
                forecast: forecast,
                address,
                lastSeen: lastSeen
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help article Not Found",
        text: "Sorry the page you were looking for does not exist.",
        name: "Mayank Khanna"
    })
})

app.get('*/*', (req, res) => {
    res.render('404', {
        title: "Page Not Found",
        text: "Sorry the page you were looking for does not exist.",
        name: "Mayank Khanna"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Page Not Found",
        text: "Sorry the page you were looking for does not exist.",
        name: "Mayank Khanna"
    })
})

// Starting the server
app.listen(port, () => {
    console.log(`Server started on port ${port} !`)
})

// ! **********************

// Info that was used earlier in the project
// For example - Lets assume we have a website - app.com
// We will be having some of the following paths like:
// app.com
// app.com/help
// app.com/about


/* Partials: These are small parts of a webpage that together form a big web-
page.
*/

// Understanding Query Strings
// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: "A search must be provided."
//         })
//     }
//     console.log('Request: ',req.query)
//     res.send({
//         product: []
//     })
// })