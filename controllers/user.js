/**
 * Copyright(C), 2016, Hengai Gaoke Tech. Co. Ltd. All rights reserved.
 * FileName: user.js
 * Description: Controller for user.
 *
 * Author: Huang Liang
 * Version: v1.0
 * Date: Aprial 12, 2016
 * History: None
 */

var crypto = require('crypto');
var rand = require('csprng');
var fs = require('fs');
var request = require('request');

var User = require('../models/user').User;

var log = require('../utils/log').log;
var errJson = require('../utils/json').errJson;

/*
 * Controller for /register
 * @ user register account @
 */
exports.register = function(email, passwd, repasswd, code, username, cb) {
	// check if email is with format XXX@XXX
	if (!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)) {
		cb(errJson(0, 'email format error'));
		return;
	}

	// check if password is too weak
	if (passwd.length < 6) {
		cb(errJson(3, 'password is too short/weak'));
		return;
	}

	// check if two passwords are same
	if (passwd != repasswd) {
		cb(errJson(4, 'two passwords are different'));
		return;
	} 

	// fill the optional parameters
	username = !username ? email : username;

	User.findOne({ id: email }, function(e, user) {
		if (!user) {
			cb(errJson(5, 'have not check email before'));
			return;
		}

		if (!!user.password) {
			cb(errJson(1, 'email is registered before'));
			return;
		}

		if (user.code != code) {
			cb(errJson(2, 'code error'));
			return;
		}
	})
}
