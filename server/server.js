const
  { config, utils }  = require( "./utils" ),
  express = require( "express" ),
  app = express(),
  aedes = require( "aedes" )(),
  logger = require( "morgan" ),
  httpPort = 8080,
  wsPort = httpPort,
  ws = require( "websocket-stream" ),
  { getDevices } = require('./app/models/device'),
  appRouter = require('./app/routes/app'),
  devicesRouter = require('./app/routes/devices')

ws.createServer({ server: app }, aedes.handle)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/app', appRouter)
app.use('/devices', devicesRouter)

getDevices().then(devices => {
  app.listen( httpPort, () => {
    // Turn on devices
    devices.forEach( ( { key } ) => {
      const topic = key + config.statusTopic
      const payload = 'on'
      console.info(`Publishing to topic "${topic}": "${payload}"`)
      aedes.publish({ topic, payload })
    } )

    setInterval( async() => {
      await Promise.all(devices.map(async device => {
        const startTime = Date.now()
        const telemetry = await utils.getTelemetry(device.key)
        const endTime = Date.now()
        const elapsed = endTime - startTime

        // Callback taking too long... prefer not to explode
        if(elapsed > config.telemetryInterval) {
          console.warn(`Telemetry for device ${device.key} took too long to retrieve (${elapsed} ms;`
            + ` ${config.telemetryInterval} ms allowed); skipping publish`)
        }
        else {
          const topic = device.key + config.telemetryTopic
          aedes.publish({ topic, payload: telemetry })
        }
      }))
    }, config.telemetryInterval );

    console.log("Listening for WebSocket connections on: " + wsPort);
    console.log("Serving HTTP on port: " + httpPort )
  })
})
