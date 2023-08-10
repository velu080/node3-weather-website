const request = require("postman-request")

const forecast = (latitude,longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5f4810147abc55c9fa3e35007208d57d&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect weather service", undefined)
        } else if (response.body.error) {
            callback("uanble to find the location. Try another location", undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. There is a " + response.body.current.precip + "% chance of rain."
            )
        }
    })
}

module.exports = forecast