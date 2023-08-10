const request = require("postman-request")

const geoCode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiZ25hbmF2ZWx1IiwiYSI6ImNsa3h6eGx3MzF0OG0zdG80NjNnaXZ0NTIifQ.YB2Zkp4CartrDkCQeh8lkA"

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("unable to connect to location services.", undefined)
        } else if (response.body.features.length === 0) {
            callback("Unable to find location. Try another location.", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode