const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=0b74ba71d59c45738b548fb56e78267e&query=${latitude},${longitude}`

    request(url, { json: true }, (error, { body } = {}) => {

        if (error) {
            callback("Unable to connect to Weather Stack API. Check your internet connection.", undefined)
        } else if (!body.success && body.error) {
            // Error while connecting to the API
            callback(`Unable to find the location. Try another search'`, undefined)
        } else {
            const temperature = body.current ? body.current.temperature : 0
            const feelsLike = body.current ? body.current.feelslike : 0
            let forecastData = `${body.current.weather_descriptions[0]}. It is ${temperature} degrees out, but feels like ${feelsLike} degrees. `
            forecastData += `The humidity is ${body.current.humidity}% and the wind direction is towards ${body.current.wind_dir}.`
            const lastSeen = `Last updated at ${body.current.observation_time}`
            callback(undefined, {
                temperature: temperature,
                feelsLike: feelsLike,
                forecast: forecastData,
                lastSeen: lastSeen
            })
        }
    })
}

module.exports = forecast