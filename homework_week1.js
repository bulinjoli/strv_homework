
// Install with:
// npm install request
// npm install request-promise

'úse strict'

const request = require('request-promise')

const BASE_URL = 'http://swapi.co/api'

// practicing callbacks
function callApi(url, callback) {
	request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            callback(null, JSON.parse(body))
        } else {
            callback(error, null)
        }
    });
}

callApi(`${BASE_URL}/people/1`, (err, data) => {
	const map = data.vehicles.map(x => callApi(x, (err, vehicle) => {
		console.log(vehicle.name)
	}))
})

// practicing promises
request(`${BASE_URL}/people/1`)
.then(data => {
	vehicles = JSON.parse(data).vehicles
	vehicles.map(x => request(x)
		.then(data => {
		vehicle = JSON.parse(data)
		console.log(vehicle.name)
	}))
})
.catch(err=>{
	console.error(err)
})


// practicing async
async function run() {
	try {
		const luke = await request(`${BASE_URL}/people/1`)
		const vehicles = JSON.parse(luke).vehicles
		const getVehicles = await vehicles.map(x => request(x)
			.then(data => {
				vehicle = JSON.parse(data)
				console.log(vehicle.name)
			}))
	} catch (error) {
		console.log(ërror)
	}
}

run()