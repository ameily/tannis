var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: String
});
var User = mongoose.Model('users', UserSchema);


var DeviceTemplateSchema = mongoose.Schema({
  name: String,
  color: String,
  hasMacAddress: {
    type: Boolean,
    default: false
  },
  hasSerialNumber: {
    type: Boolean,
    default: false
  },
  hasManufacturer: {
    type: Boolean,
    default: false
  },
  hasCompanyTag: {
    type: Boolean,
    default: false
  },
  isContainer: {
    type: Boolean,
    default: false
  },

  customFields: [{
    name: String,
    isRequired: Boolean,
    regexPattern: String
  }]
});
var DeviceTemplate = mongoose.Model('device_templates', DeviceTemplateSchema);

var DeviceSchema = mongoose.Schema({
  name: String,
  templateId: mongoose.Schema.Types.ObjectId,
  ownerId: mongoose.Schema.Types.ObjectId,
  parentId: mongoose.Schema.Types.ObjectId,

  macAddress: String,
  serialNumber: String,
  manufacturer: String,
  modelNumber: String,
  companyTag: String,

  isContainer: Boolean,

  customFields: [{
    name: String,
    value: String
  }],
  changelog: [Object]
});
var Device = mongoose.Model('devices', DeviceSchema);

var DefaultDeviceTemplates = [
  new DeviceTemplate({
    name: "Computer",
    hasSerialNumber: true,
    hasManufacturer: true,
    hasCompanyTag: true,
    isTransferable: true
  }),
  new DeviceTemplate({
    name: "Monitor",
    hasManufacturer: true,
    hasCompanyTag: true,
    isTransferable: true
  }),
  new DeviceTemplate({
    name: "Hardwired NIC",
    hasMacAddress: true
  }),
  new DeviceTemplate({
    name: "Removable NIC",
    hasMacAddress: true,
    isTransferable: true
  }),
  new DeviceTemplate({
    name: "Virtual Machine",
    hasMacAddress: true,
    isTransferable: true
  }),
  new DeviceTemplate({
    name: "Server",
    hasSerialNumber: true,
    hasManufacturer: true,
    hasCompanyTag: true,
    isTransferable: true
  }),
  new DeviceTemplate({
    name: "Generic Tagged Device",
    hasManufacturer: true,
    hasCompanyTag: true
  }),
  new DeviceTemplate({
    name: "Generic Device"
  })
]

