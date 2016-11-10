var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: String
});
exports.User = mongoose.model('users', UserSchema);


var DeviceTemplateSchema = mongoose.Schema({
  name: String,
  fgColor: String,
  bgColor: String,
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
exports.DeviceTemplate = mongoose.model('device_templates', DeviceTemplateSchema);

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

  bgColor: String,
  fgColor: String,

  isContainer: Boolean,

  customFields: [{
    name: String,
    value: String
  }],
  changelog: [Object]
});


function nullOrEmpty(value, forceEmptyString) {
  return value ? value : (forceEmptyString ? "" : null);
}


DeviceSchema.statics.createFromTemplate = function(template, options) {
  if(!options) {
    options = {};
  }

  var device = new exports.Device({
    name: options.name || template.name,
    templateId: template._id,
    ownerId: options.ownerId || null,
    parentId: options.parentId || null,

    macAddress: nullOrEmpty(options.macAddress, template.hasMacAddress),
    serialNumber: nullOrEmpty(options.serialNumber, template.hasSerialNumber),
    modelNumber: nullOrEmpty(options.modelNumber, template.hasManufacturer),
    manufacturer: nullOrEmpty(options.manufacturer, template.hasManufacturer),
    companyTag: nullOrEmpty(options.companyTag, template.hasCompanyTag),

    isContainer: template.isContainer,

    bgColor: options.bgColor || null,
    fgColor: options.fgColor || null,

    customFields: options.customFields || []
  });

  return device;
};

exports.Device = mongoose.model('devices', DeviceSchema);


/*
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
*/
