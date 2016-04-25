/**
 * Copyright(C), 2016, Hengai Gaoke Tech. Co. Ltd. All rights reserved.
 * FileName: index.test.js
 * Description: Unit test code for index.js
 *
 * Author: Huang Liang
 * Version: v1.0
 * Date: Aprial 12, 2016
 * History: None
 */

var index = require('../routes/index');

describe('index', function() {
	describe('index.login', function() {
		it('index login success', function() {
			index.login(10).should.be.equal(10);
		});
	});
})
