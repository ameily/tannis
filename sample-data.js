var models = require('./models');


exports.Templates = [];
exports.Devices = [];

var Workstation = new models.DeviceTemplate({
  name: "Workstation",
  color: null, //TODO

  hasMacAddress: false,
  hasManufacturer: true,
  hasSerialNumber: true,
  hasCompanyTag: true,

  isContainer: true
});
exports.Templates.push(Workstation);

var Server = new models.DeviceTemplate({
  name: "Server",
  color: null, //TODO

  hasMacAddress: false,
  hasManufacturer: true,
  hasSerialNumber: true,
  hasCompanyTag: true,

  isContainer: true
});
exports.Templates.push(Server);

var Laptop = new models.DeviceTemplate({
  name: "Laptop",
  color: null, //TODO

  hasMacAddress: false,
  hasManufacturer: true,
  hasSerialNumber: true,
  hasCompanyTag: true,

  isContainer: true
});
exports.Templates.push(Laptop);

var VirtualMachine = new models.DeviceTemplate({
  name: "Virtual Machine",
  color: null, //TODO

  hasMacAddress: true
});
exports.Templates.push(VirtualMachine);

var Switch = new models.DeviceTemplate({
  name: "Switch",

  hasManufacturer: true,
  hasSerialNumber: true,
  hasCompanyTag: true
});
exports.Templates.push(Switch);

var Router = new models.DeviceTemplate({
  name: "Router",

  hasManufacturer: true,
  hasSerialNumber: true,
  hasCompanyTag: true
});
exports.Templates.push(Router);

var Monitor = new models.DeviceTemplate({
  name: "Monitor",

  hasManufacturer: true,
  hasCompanyTag: true
});
exports.Templates.push(Monitor);

var NetworkCard = new models.DeviceTemplate({
  name: "Network Card",
  color: null, //TODO

  hasMacAddress: true
});
exports.Templates.push(NetworkCard);

var Container = new models.DeviceTemplate({
  name: "Container",

  isContainer: true
});
exports.Templates.push(Container);

var GenericTaggedDevice = new models.DeviceTemplate({
  name: "Generic Tagged Device",

  hasCompanyTag: true
});
exports.Templates.push(GenericTaggedDevice);

var TestWorkstation = new models.Device({
  name: "Workstation",
  templateId: Workstation._id,
  ownerId: null,
  parentId: null,

  manufacturer: "Dell",
  modelNumber: "Optiplex",
  serialNumber: "ABCD-1234"
});
exports.Devices.push(TestWorkstation);

var WSNic = new models.Device({
  name: "NIC Card",
  templateId: NetworkCard._id,
  ownerId: null,
  parentId: TestWorkstation._id,
  macAddress: "aa:bb:cc:dd:ee"
});
exports.Devices.push(WSNic);

var WSMonitor = new models.Device({
  name: "Monitor",
  templateId: Monitor._id,
  ownerId: null,
  parentId: TestWorkstation._id,

  manufacturer: "Dell",
  modelNumber: "XPS 21"
})
exports.Devices.push(WSMonitor);

var WSVM = new models.Device({
  name: "Windows VM",
  templateId: VirtualMachine._id,
  ownerId: null,
  parentId: TestWorkstation._id,

  macAddress: "bb:cc:dd:ee:ff"
});
exports.Devices.push(WSVM);

var TestRouter = new models.Device({
  name: "Router",
  templateId: Router._id,
  ownerId: null,
  parentId: null
});
exports.Devices.push(TestRouter);

var initialize = exports.initialize = function() {
  var mongoose = require('mongoose');
  var items = exports.Devices.concat(exports.Templates);
  var i = 0;
  function cb() {
    i += 1;
    console.log('insert: %d', i);
    if(i < items.length) {
      items[i].save(cb);
    }
  }

  mongoose.connect('mongodb://localhost:27017/tannis', function() {
    items[0].save(cb);
  });
};


initialize();