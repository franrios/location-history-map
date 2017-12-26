export function getFlightTrips(locationHistory) {
  const flights = []
  locationHistory.forEach(({ latitudeE7, longitudeE7 }, i) => {
    const [lat, long] = [latitudeE7 / 1e7, longitudeE7 / 1e7]
    const nextLocation = locationHistory[i + 1]
    if (!nextLocation) return
    const [lat2, long2] = [
      nextLocation.latitudeE7 / 1e7,
      nextLocation.longitudeE7 / 1e7
    ]

    var d = calcCrow(lat, long, lat2, long2)
    if (d > 300) {
      flights.push({
        sourcePosition: [long, lat],
        targetPosition: [long2, lat2],
        color: [0, 255, 255]
      })
    }
  })
  return flights
}

function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371 // km
  var dLat = toRad(lat2 - lat1)
  var dLon = toRad(lon2 - lon1)
  var lat1 = toRad(lat1)
  var lat2 = toRad(lat2)

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d
}

// Converts numeric degrees to radians
function toRad(Value) {
  return Value * Math.PI / 180
}
