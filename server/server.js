const
  { config, utils }  = require( "./utils" ),
  express = require( "express" ),
  app = express(),
  aedes = require( "aedes" ),
  logger = require( "morgan" ),
  httpPort = 8080,
  wsPort = httpPort,
  ws = require( "websocket-stream" ),
  broker = ws.createServer({ server: app }, aedes.handle),
  devices = {},
  appRouter = require('./app/routes/app'),
  devicesRouter = require('./app/routes/devices')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/app', appRouter)
app.use('/devices', devicesRouter)

app.listen( httpPort, () => {
    // TODO: This line needs to be fixed
    Object.keys(devices).forEach( (deviceKey)=> broker.publish( deviceKey, "on" ) )

    setInterval( () => {
      // TODO: This line needs to be fixed
      utils.getTelemetry()
      // TODO: This line needs to be fixed
      // broker.publish();
    }, config.telemetryInterval );
  
  console.log("Listening for WebSocket connections on: " + wsPort);
  console.log("Serving HTTP on port: " + httpPort )
})
