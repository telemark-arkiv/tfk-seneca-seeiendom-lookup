'use strict'

const Converter = require('wgs84-util')

module.exports = function cleanupData (data) {
  var out = data[0]
  const geo = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [out.LONGITUDE, out.LATITUDE]
    },
    properties: {
      zoneLetter: 'N',
      zoneNumber: 32
    }
  }
  const converted = Converter.UTMtoLL(geo)

  out.geocoded = {
    lat: converted.coordinates[1],
    lon: converted.coordinates[0]
  }

  return out
}
