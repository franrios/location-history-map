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

function calcCrow(latitude1, longitude1, latitude2, longitude2) {
  const R = 6371 // km
  const dLat = toRad(latitude2 - latitude1)
  const dLon = toRad(longitude2 - longitude1)
  const lat1 = toRad(latitude1)
  const lat2 = toRad(latitude2)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Converts numeric degrees to radians
function toRad(Value) {
  return Value * Math.PI / 180
}
