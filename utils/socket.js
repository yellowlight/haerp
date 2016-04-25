var Message = require('../models/message').Message;
var User = require('../models/user').User;

log = require('../utils/log').log;
err = require('../utils/log').err;
logUrl = require('../utils/log').logUrl;

var usersockets = {};

module.exports.usersockets = usersockets;

module.exports.start = function (io) {
    io.on('connection', function (socket) {
        var addedUser = false;

        socket.on('login socket', function (token) {
			User.findOne({ token: token }, { username: 1 }, function(e, o) {
                if (!o) { err('user connect socket error'); return; }

				socket.user = o._id;
				usersockets[o._id] = socket;
				
				log('%s login socket successfully', o.username);

				Message.find({ owner: o._id }, { type: 1, subtype: 1, content: 1, userid: 1, username: 1, useravatar: 1, date: 1, note: 1 }, { sort: { date: -1 } }, function(e, messages) {
                    bool = { 'accepted': true, 'requested': true, 'new': true, 'action': true, 'update': true };
                    meta = { 'size': 0 };
                    set = [];
					for (var i = 0; i < messages.length; i++) {
                        tmp = messages[i].toJSON();

                        if (tmp.type == 'circle') {
                            if (bool[tmp.subtype] === true) {
                                socket.emit('batch circle', { 'type': 'circle', 'subtype': tmp.subtype });
                                bool[tmp.subtype] = false;
                            }
                            Message.remove({ _id: tmp._id }, function(e) { if (!!e) err('remove message error'); });
                        }

                        if (tmp.type == 'note') {
                            if (tmp.subtype == 'new') {
                                if (tmp.subtype === true) {
									socket.emit('note new', { 'type': 'note', 'subtype': tmp.subtype });
								}
                                bool[tmp.subtype] = false;

                                Message.remove({ _id: tmp._id }, function(e) { if (!!e) err('remove message error'); });
                            } else if (tmp.subtype == 'action' && bool[tmp.subtype] === true){
                                meta.size += 1;
                                meta.userid = tmp.userid;
                                meta.username = tmp.username;
                                meta.useravatar = tmp.useravatar;
                                bool[tmp.subtype] = false;
                            } else if (tmp.subtype == 'update') {
                                if (set.indexOf(tmp.note) < 0) { set.push(tmp.note); }

                                Message.remove({ _id: tmp._id }, function(e) { if (!!e) err('remove message error'); });
                            }
                        }
					}

                    if (meta.size !== 0) {
                        socket.emit('note action', { 'type': 'note', 'subtype': 'action', 'meta': meta });
                    }

                    if (set.length !== 0) {
                        socket.emit('note update', { 'type': 'note', 'subtype': 'update', 'notes': set });
                    }
				});
			});
        });

        // when the user disconnects.. delete the user socket
        socket.on('disconnect', function () {
            if (addedUser) {
                delete usersockets[socket.user];
            }
        });
    });
};
