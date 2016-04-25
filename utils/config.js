var crypto = require('crypto');
var rand = require('csprng');

/*
 * If True, Do Not Implement Controllers, Just Testing APIs Formats if Statisfied
 *
 * Always be False
 *
 */
module.exports.TEST = true;

/*
 * If True, Will Print all The Debug Information
 *
 * Always be False
 *
 */
module.exports.DEBUG = true;

/*
 * If True, Will Print all The Log Information.
 * 
 * Always be True
 *
 */
module.exports.LOG = true;

/*
 *
 */
module.exports.DEFAULT_AVATAR = "/images/default_avatar.jpg";
module.exports.BEGIN = "2015-08-01";

/*
 * Uploads Config
 *
 */
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname == 'avatar') {
            cb(null, 'public/uploads/avatars');
        } else if (file.fieldname == 'audio') {
            cb(null, 'public/uploads/audios');
        } else if (file.fieldname == 'image') {
            cb(null, 'public/uploads/images');
        } else if (file.fieldname == 'ecg') {
            cb(null, 'public/uploads/ecgs');
        } else if (file.fieldname == 'motto') {
            cb(null, 'public/uploads/mottos');
        } else {
            cb(null, 'public/uploads');
        }
    },
    filename: function (req, file, cb) {
        var tokens = file.originalname.split(".");

        var name = crypto.createHash('md5').update(Date.now() + rand(160, 36)).digest("hex");
        cb(null, name + Date.now() + "." + tokens[tokens.length - 1]);          
    }
});
module.exports.upload = multer({ storage: storage });
