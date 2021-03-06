'use strict'

const Seeiendom = require('seeiendom')
const fixAddress = require('tfk-utils-fix-address-for-seeiendom')
const envs = process.env
const cleanupData = require('./cleanup-data')

module.exports = function (options) {
  const seneca = this

  seneca.add('role:seeiendom, cmd:lookup', lookupSeeiendom)

  return {
    name: envs.TFK_SENECA_SEEIENDOM_LOOKUP_TAG || 'tfk-seneca-seeiendom-lookup'
  }
}

function lookupSeeiendom (args, callback) {
  const seeOptions = {
    query: fixAddress(args.address)
  }

  Seeiendom(seeOptions, function (error, data) {
    if (error) {
      callback(error, null)
    } else {
      if (data.length > 0) {
        const fixedData = cleanupData(data)

        if (fixedData.geocoded) {
          callback(null, fixedData)
        } else {
          callback(new Error('Could not geocode address'), null)
        }
      } else {
        callback(new Error('Address returned no hits from Seeiendom'), null)
      }
    }
  })
}
