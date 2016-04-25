/**
 * Copyright(C), 2016, Hengai Gaoke Tech. Co. Ltd. All rights reserved.
 * FileName: user.js
 * Description: Model for user.
 *
 * Author: Huang Liang
 * Version: v1.0
 * Date: Aprial 12, 2016
 * History: None
 */

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	/*
	 * Basic user properties
	 */
	id: { type: String, default: null },
	openid: { type: String, default: null },
	username: { type: String, default: null },
	password: { type: String, default: null },
	token: { type: String, default: null },
	statuscode: { type: String, default: null },

	/*
	 * Key point datetime
	 */
	check_phone_date: { type: Date, default: null },
	register_date: { type: Date, default: null },
	change_passwd_date: { type: Date, default: null },
	last_login_date: { type: Date, default: null },
	verify_date: { type: Date, default: null },
})

module.exports.User = mongoose.model('User', userSchema);
