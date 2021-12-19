const express = require('express')
const { getDevices } = require('../models/device')
const router = express.Router()

/**
 * GET /devices - list devices
 */
router.get('/', async function( req, res ) {
  try {
    res.send((await getDevices()).map(d => d.key))
  }
  catch(e) {
    console.error('Error listing devices:', e)
    res.status(500)
    res.send({
      error: 'Failed to list devices',
    })
  }
})

module.exports = router
