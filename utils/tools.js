var BEGIN = require('./config').BEGIN;
var rf=require("fs");
var goldwords = rf.readFileSync("/root/Uploads/goldword","utf-8");

exports.isWeakPassword = function(passwd) {
    if (passwd.length < 6)
        return true;
    return false;
};

exports.isUndefined = function() {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] === undefined) return true;
    }
    return false;
};

exports.isLegalImageFile = function(file) {
    // TODO
	if (file === undefined)
		return true;
    return true;
};

exports.isLegalPhone = function(phone) {
    return phone.length == 11 && phone.match(/1\d{10}$/);
};

exports.isLegalUsername = function(username) {
    return true;
};

exports.isLegalSignature = function(signature) {
    return true;
};

exports.isLegalBirthday = function(birthday) {
    return true;
};

exports.isLegalAddress = function(address) {
    return true;
};

exports.urlFromMottoFile = function(file) {
    return '/uploads/mottos/' + file.filename;
};

exports.urlFromAvatarFile = function(file) {
    return '/uploads/avatars/' + file.filename;
};

exports.urlFromEcg = function(file) {
    return '/uploads/ecgs/' + file.filename;
};

exports.urlFromAudioFile = function(file) {
    return '/uploads/audios/' + file.filename;
};

exports.urlFromImageFile = function(file) {
    return '/uploads/images/' + file.filename;
};

exports.normalDateTime = function(datetime) {
    datetime = new Date(+datetime + 8 * 3600 * 1000);
    return datetime.toISOString().replace(/T/, ' ').replace(/.\d\d\dZ/, '');
};

exports.normalDate = function(datetime) {
    datetime = new Date(+datetime + 8 * 3600 * 1000);
    return datetime.toISOString().replace(/T\d.+/, '');
};

exports.calculateMean = function(arrays) {
    var total = 0;
    for (var i = 0; i < arrays.length; i++) {
        total += arrays[i];
    }

    return total / arrays.length;
};

exports.calculateVar = function(arrays) {
    var mean = exports.calculateMean(arrays);
    var total = 0;
    for (var i = 0; i < arrays.length; i++) {
        total += ((arrays[i] - mean) * (arrays[i] - mean));
    }

    return total / arrays.length;
};

exports.isLegalDate = function(date) {
    if (date === undefined || date === "") {
        return true;
    } else {
        return !!(date.match(/^\d{4}-\d{1,2}-\d{1,2}$/));
    }
};

exports.isLegalDateTime = function(datetime) {
    if (datetime === undefined || datetime === "") {
        return true;
    } else {
        return !!(datetime.match(/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/));
    }
};

exports.defaultCurrentDateTime = function(dt) {
    return (dt === undefined || dt === "") ? new Date() : new Date(dt);
};

exports.defaultBeginDateTime = function(dt) {
    return (dt === undefined || dt === "") ? new Date(BEGIN) : new Date(dt);
};

exports.defaultEndDateTime = function(dt) {
    var now = new Date();
    return (dt === undefined || dt === "") ? new Date(+now + 1000) : new Date(dt);
};
exports.getGoldWord = function(){
	var goldwordArray = goldwords.split('\n');
    return goldwordArray[Math.round(Math.random()*200)];    
}
