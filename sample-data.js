var models = require('./models');


exports.Templates = [];
exports.Devices = [];

var Workstation = new models.DeviceTemplate({
  name: "Workstation",

  hasMacAddress: false,
  hasManufacturer: true,
  hasSerialNumber: true,
  hasCompanyTag: true,

  bgColor: "#2e6da4",
  fgColor: "#fff",

  isContainer: true
});
exports.Templates.push(Workstation);

var Server = new models.DeviceTemplate({
  name: "Server",
  bgColor: "#eea236",
  fgColor: "#fff",

  hasMacAddress: false,
  hasManufacturer: true,
  hasSerialNumber: true,
  hasCompanyTag: true,


  isContainer: true
});
exports.Templates.push(Server);

var Laptop = new models.DeviceTemplate({
  name: "Laptop",

  hasMacAddress: false,
  hasManufacturer: true,
  hasSerialNumber: true,
  hasCompanyTag: true,

  bgColor: "#4cae4c",
  fgColor: "#fff",

  isContainer: true
});
exports.Templates.push(Laptop);

var VirtualMachine = new models.DeviceTemplate({
  name: "Virtual Machine",
  bgColor: "#d43f3a",
  fgColor: "#fff",

  hasMacAddress: true
});
exports.Templates.push(VirtualMachine);

var Switch = new models.DeviceTemplate({
  name: "Switch",
  bgColor: "#9933cc",
  fgColor: "#fff",

  hasManufacturer: true,
  hasSerialNumber: true,
  hasCompanyTag: true
});
exports.Templates.push(Switch);

var Router = new models.DeviceTemplate({
  name: "Router",
  bgColor: "#00bc8c",
  fgColor: "#fff",

  hasManufacturer: true,
  hasSerialNumber: true,
  hasCompanyTag: true
});
exports.Templates.push(Router);

var Monitor = new models.DeviceTemplate({
  name: "Monitor",
  bgColor: "#375a7f",
  fgColor: "#fff",

  hasManufacturer: true,
  hasCompanyTag: true
});
exports.Templates.push(Monitor);

var NetworkCard = new models.DeviceTemplate({
  name: "Network Card",
  bgColor: "#2b3e50",
  fgColor: "#fff",

  hasMacAddress: true
});
exports.Templates.push(NetworkCard);

var Container = new models.DeviceTemplate({
  name: "Container",
  bgColor: "#464545",
  fgColor: "#fff",

  isContainer: true
});
exports.Templates.push(Container);

var GenericTaggedDevice = new models.DeviceTemplate({
  name: "Generic Tagged Device",
  bgColor: "#464545",
  fgColor: "#fff",

  hasCompanyTag: true
});
exports.Templates.push(GenericTaggedDevice);

var TestWorkstation = models.Device.createFromTemplate(Workstation, {
  name: "Workstation",

  manufacturer: "Dell",
  modelNumber: "Optiplex",
  serialNumber: "81ba8019a",
  companyTag: "ATM-1234"
});
exports.Devices.push(TestWorkstation);

var WSNic = models.Device.createFromTemplate(NetworkCard, {
  name: "NIC Card",
  parentId: TestWorkstation._id,
  macAddress: "aa:bb:cc:dd:ee"
});
exports.Devices.push(WSNic);

var WSMonitor = models.Device.createFromTemplate(Monitor, {
  name: "Monitor",
  parentId: TestWorkstation._id,

  manufacturer: "Dell",
  modelNumber: "XPS 21"
});
exports.Devices.push(WSMonitor);

var WSVM = models.Device.createFromTemplate(VirtualMachine, {
  name: "Windows VM",
  parentId: TestWorkstation._id,

  macAddress: "bb:cc:dd:ee:ff",
  customFields: [{
    name: "Windows Version",
    value: "Windows XP SP2"
  }, {
    name: "Architecture",
    value: "x86"
  }]
});
exports.Devices.push(WSVM);

var TestRouter = models.Device.createFromTemplate(Router, {
  manufacturer: "TP-Link",
  modelNumber: "Archer C7"
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
    } else {
      mongoose.disconnect();
    }
  }

  mongoose.connect('mongodb://localhost:27017/tannis', function() {
    items[0].save(cb);
  });
};


initialize();