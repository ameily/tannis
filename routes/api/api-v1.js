
var router = require('express').Router();

function getDevices(userId, deviceId, res) {
  var q = {
    ownerId: ObjectId(userId)
  };

  if(!res) {
    res = deviceId;
    deviceId = null;
  }

  if(deviceId) {
    q.parentId = ObjectId(deviceId);
  } else {
    q.parentId = null;
  }

  models.Device.find(q, function(err, devices) {
    res.json(devices);
  })
}

function getDevice(userId, deviceId, res) {
  if(!res) {
    res = deviceId;
    deviceId = userId;
    userId = null;
  }

  //TODO only get current user's devices
  models.Device.find({_id: ObjectId(deviceId)}, function(err, device) {
    if(device && (!userId || ObjectId(userId) == device.ownerId)) {
      res.json(device);
    } else {
      res.status(404).end();
    }
  });
}

router.get('/device-templates', function(req, res) {
  models.DeviceTemplate.find(function(err, templates) {
    res.json(templates);
  });
});

router.get('/device-templates/:templateId', function(req, res) {
  models.DeviceTemplate.findOne({_id: ObjectId(req.param.templateId)}, function(err, template) {
    res.json(template);
  })
});

router.get('/devices', function(req, res) {
  //TODO only get current user's devices
  var userId = ""; //TODO current user id
  getDevices(userId, res);
});

router.get('/devices/:deviceId', function(req, res) {
  //TODO only get current user's devices
  var userId = null; //TODO current user id
  getDevice(userId, req.params.deviceId, res);
});

router.get('/devices/:deviceId/children', function(req, res) {
  //TODO only get current user's devices
  var userId = ""; //TODO current user id
  getDevices(userId, req.params.deviceId, res);
})

router.get('/users', function(req, res) {
  //TODO admin only
  models.User.find({}, function(err, users) {
    res.json(users);
  });
});

router.get('/users/:userId', function(req, res) {
  // TODO admin only
  models.User.findOne({_id: ObjectId(req.params.userId)}, function(err, user) {
    if(user) {
      res.json(user);
    } else {
      res.status(404).end();
    }
  });
});

router.get('/users/:userId/devices', function(req, res) {
  //TODO admin only
  getDevices(req.params.userId, res);
});

router.get('/users/:userId/devices/:deviceId', function(req, res) {
  // TODO admin only
  getDevice(req.params.userId, req.params.deviceId, res);
});

router.get('/users/:userId/devices/:deviceId/children', function(req, res) {
  // TODO admin only
  getDevices(req.params.userId, req.params.deviceId, res);
});

module.exports = router;


