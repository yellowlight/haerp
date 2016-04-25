var winston = require('winston');
tools = require('./tools');

var logger = new (winston.Logger) ({
    transports: [
        new (winston.transports.File) ({
            filename: "donni.log",
            json: false,
            timestamp: false,
        })
    ]
});

function logUrl(req, res, next) {
    logger.info(tools.normalDateTime(new Date()) + " -- " + req.url);
    next();
}

module.exports.log = logger.info;
module.exports.err = logger.error;
module.exports.logUrl = logUrl;
