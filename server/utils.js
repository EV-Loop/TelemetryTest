const randomRange = ( min, max ) => ((Math.random() * (max - min + 1)) + min)
const randomFixedRange = ( min, max, places ) => randomRange( min, max ).toFixed( places )
const config = {
  numDevices:        Math.round( randomRange( 10, 50 ) ),
  telemetryInterval: 1000, 
  statusTopic:       "/status",
  telemetryTopic:    "/telemetry"
}
const utils = {
  publishTelemetry: function ( broker, deviceId ) {
    broker.publish({
      topic: deviceId + config.telemetryTopic,
      payload: utils.generateTelemetryMessage(),
      qos: 0,
      retain: true
    });
  },
  generateTelemetryMessage: function () {
    return Buffer.from(JSON.stringify({
      currentMeterWh: randomFixedRange(0, 7800, 1),
      temperature: randomFixedRange(40, 60, 1),
      timeStamp: Math.floor(new Date().getTime() / 1000 ),
      status: "charging"
    }))
  },
  randomRange: randomRange
} 
module.exports = {
  config,
  utils
}
