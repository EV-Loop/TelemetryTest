const express = require('express')
const router = express.Router()

/**
 * GET /app/status - get some app status info
 */
router.get('/status', function(req, res) {
  res.send({
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
  })
})

module.exports = router
