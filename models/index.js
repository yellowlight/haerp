/**
 * Copyright(C), 2016, Hengai Gaoke Tech. Co. Ltd. All rights reserved.
 * FileName: index.js
 * Description: Model for index.
 *
 * Author: Huang Liang
 * Version: v1.0
 * Date: Aprial 12, 2016
 * History: None
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var indexSchema = Schema({
	username: { type: String, default: null },
	password: { type: String, default: null },
});

module.exports.Index = mongoose.model('Index', indexSchema);
