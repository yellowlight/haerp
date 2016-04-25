var crypto = require("crypto");

var handle;
var serverHost = "app.cloopen.com";
var serverPort = 8883;
var softVersion = "2013-12-26";
var appId = "aaf98f894f16fdb7014f22b8744a104e";
var accountSid = "aaf98f894b00309b014b02532b26023a";
var accountToken = "04815f8a057743ce86b85484db2d7933";

var templates = {
    'captcha': 31317,
    'invite': 31317
};

var YTX = {
    post: function (options, data, next) {
              var https = require('https');
              var req = https.request(options, function (res) {
                  res.on('data', function (data) {
                      try {
                          var json = JSON.parse(data);
                          next(0, data);
                      } catch(e) {
                          next(errors.NETWORK_ERROR);
                      }
                  });
              });
              req.write(JSON.stringify(data));
              req.end();

              req.on('error', function (e) {
                  console.error(e);
                  next(e, null);
              });
          },

    getOptions: function() {
        var timestamp = (new Date()).toISOString().slice(0,19).replace(/[^0-9]/g, "");
        var sig = crypto.createHash('md5').update(accountSid + accountToken + timestamp).digest('hex').toUpperCase();
        var auth = new Buffer(accountSid + ":" + timestamp);
    auth = auth.toString("base64");
    return {
      host: serverHost,
      port: serverPort,
      method: 'POST',
      path: "/" + softVersion + "/Accounts/" + accountSid + "/SMS/TemplateSMS?sig=" + sig,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: auth
      },
      rejectUnauthorized: false,
      requestCert: true,
      agent: false,
      secureProtocol: 'SSLv3_method'
    };
  },

  smsTemplate: function (phone, data, tempId, next) {
    var meta = {
      to: phone,
      templateId: tempId,
      appId: appId,
      datas: data
    };

    var options = YTX.getOptions();
    YTX.post(options, meta, function (err, data) {
      next(err, data);
    });
  },

  smsCaptcha: function(phone, captcha, next) {
    YTX.smsTemplate(phone, [captcha, '2'], templates.captcha, next);
  },

  smsInvite: function(phone, user, next) {
    YTX.smsTemplate(phone, [user, '2'], templates.invite, next);
  },
};

module.exports = YTX;
