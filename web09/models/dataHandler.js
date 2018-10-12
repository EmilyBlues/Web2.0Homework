var db = require('./db');

var dataHandler = {
	insert: function(user) {
		return new Promise(function(resolve, reject) {
			db.open(function(err, db) {
				if (err) {
					reject(err);
 				}
				db.collection('users', function(err, users) {
					if (err) {
						db.close();
						reject(err);
					}
					users.insert(user, {safe: true}, function(err, user) {
						db.close();
						if (err) {
							reject(err);
						}
						resolve(user);
					});
				});
			});
		}); 
	},

	getAllUsers: function() {
		return new Promise(function(resolve, reject) {
			db.open(function(err, db) {
				if (err) {
					reject(err);
				}
				db.collection('users', function(err, users) {
					if (err) {
						db.close();
						reject(err);
						}
						users.find({}).toArray(function(err, users) {
						db.close();
						if (err) {
						  reject(err);
						}
						resolve(users);
					});
				});
			});
		});
	},

	getUserByUsername: function(name) {
		return new Promise(function(resolve, reject) {
			db.open(function(err, db) {
				if (err) {
					reject(err);
				}
				db.collection('users', function(err, users) {
					if (err) {
						db.close();
						reject(err);
					}
					users.findOne({username: name}, function(err, user) {
						db.close();
						if (err) {
							reject(err);
						}
						resolve(user);
					});
				});
			});
		});
	}
}

exports.dataHandler = dataHandler;