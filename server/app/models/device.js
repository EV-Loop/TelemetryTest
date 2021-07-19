/**
 * UUIDs for {@link Device}. This is a sort of pseudo-type alias to add some semantic meaning to what are really just
 * Strings (for now).
 */
const DeviceKey = String

/**
 * Another sort of type alias for a would-be Device class/model that would encapsulate such data. Currently has no
 * formally specified properties but they are as follows:
 *
 * @property {DeviceKey} key     Device UUID
 * @property {String}    macAddr Device MAC address
 */
const Device = Object

/**
 * @type {Device[] | Object[]}
 *
 * Registered devices hardcoded for this toy app. In some prod incarnation of this app, this would be obtained from
 * some DB somewhere, which itself would be updated when devices are programmed perhaps, or when customers register
 * them to their accounts, or... who knows. :)
 *
 * Fakers used:
 *  - UUID: https://www.uuidgenerator.net/
 *  - macAddr: https://www.hellion.org.uk/cgi-bin/randmac.pl?scope=local&type=unicast
 *
 * @see getDevices()
 */
const _devices = [
  {
    key: 'e6121e62-5ca4-442d-b030-59eb72fef5b3',
    macAddr: '96:85:87:92:71:64',
  },
  {
    key: '5613ecb9-36e6-4d76-b19e-c9380e32301d',
    macAddr: '2e:0d:7e:73:57:28',
  },
  {
    key: '6a5f4678-2998-4ef2-bbce-78d593984cdb',
    macAddr: '62:b2:5e:52:94:12',
  },
]

/**
 * Silly implementation, but could be implemented with some kind of DB or file lookup, or however devices are stored in
 * prod.
 *
 * @return {Promise<Device[]>}
 */
async function getDevices() {
  return _devices
}

/** @return {Promise<Number>} See getDevices() for notes on toy impl vs. prod */
async function getNumDevices() {
  return _devices.length
}

module.exports = {
  DeviceKey,
  Device,
  getDevices,
  getNumDevices,
}