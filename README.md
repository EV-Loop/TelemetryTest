# Loop Inc. EVSE Telemetry

You will write an server side Node.js application that will support:

- REST API routes for
  - Returning a list of devices
  - Returning version identified in your package.json

- WebSocket support for:
  - Emitting device telemetry data to a client on an interval


You will write a simple client-side application **of your choice that will:** ( If you want to be fancy it can be a CLI )
- Return a list of devices provided by the API described above
- Subscribe to and display data emitted from socket server described above

Be mindful, some things in the bootstrap are intentionally broken ( or out of date? ). Imagine a JR developer was given this and you have to fix & complete this.
