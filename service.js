'use strict'

const Seneca = require('seneca')
const Mesh = require('seneca-mesh')
const Seeiendom = require('./lib/seeiendom')
const envs = process.env

const options = {
  seneca: {
    tag: envs.TFK_SENECA_SEEIENDOM_LOOKUP_TAG || 'tfk-seneca-seeiendom-lookup'
  },
  mesh: {
    auto: true,
    listen: [
      {pin: 'role:seeiendom, cmd:lookup', model: 'consume'}
    ]
  },
  seeiendom: {
    url: envs.TFK_SENECA_SEEIENDOM_LOOKUP_URL || 'https://seeiendomlookup.no'
  },
  isolated: {
    host: envs.TFK_SENECA_SEEIENDOM_LOOKUP_HOST || 'localhost',
    port: envs.TFK_SENECA_SEEIENDOM_LOOKUP_PORT || 8000
  }
}

var Service = Seneca(options.seneca)

if (envs.TFK_SENECA_SEEIENDOM_LOOKUP_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Seeiendom, options.seeiendom)
