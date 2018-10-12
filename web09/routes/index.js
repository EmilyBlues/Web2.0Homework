var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:index');
var validator = require('../public/javascripts/validator').validator;
var dataHandler = require('../models/dataHandler').dataHandler;
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
    debug("not exist");
    res.render('index', { title: '用户登陆' , user: {username: '', password: ''} });
  }
  else {
    debug("exist");
    var currentUser = req.session.user.username;
    debug(currentUser);
    var visitUser = req.query.username;
    if (!!visitUser && currentUser != visitUser) {
      debug("flash");
      req.flash('info', "otherUserVisited");
    }
    res.redirect('detail');
  }
});

router.post('/', function(req, res, next) {
  var postData = req.body;
  dataHandler.getUserByUsername(postData.username).then(function(user) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(postData.password).digest('hex');
    if (password == user.password) {
      req.session.user = user;
      res.redirect('detail');
    } else {
      req.flash('error', '密码错误');
      res.redirect('/');
    }
  }).catch(function(err) {
    debug(err);
    req.flash('error', '用户名不存在');
    res.redirect('/');
  });
});

router.get('/regist', function(req, res, next) {
  var empty = {
    username: '',
    possword: '',
    confirm: '',
    s_id: '',
    phone: '',
    email: ''
  };
  res.render('register', {title: '用户注册', error: '', user: empty});
});

router.post('/checkRepeated', function(req, res, next) {
  var postData = req.body;
  debug(postData);

  dataHandler.getAllUsers().then(function(users) {
    return validator[postData.checkType].isRepeated(users, postData.value);
  }).then(function() {
    debug("checkRepeated: success");
    res.send("success");
  }).catch(function(err) {
    debug("checkRepeated: fail", err);
    res.send("fail");
  });
});

router.post('/regist', function(req, res, next) {
  var userData = req.body;
  debug("userData");
  debug(userData);
  debug("userData");

  dataHandler.getAllUsers().then(function(users) {
    debug("users");
    debug(users);
    debug("users");
    try {
      validator.checkUser(users, userData);
      var md5 = crypto.createHash('md5');
      userData.password = md5.update(userData.password).digest('hex');
      dataHandler.insert(userData);
      req.session.user = userData;
      res.redirect("/detail");
    } catch(err) {
      debug(err);
      res.render('register', {title: '用户注册', error: '', user: userData});
    }
  });
});

router.get('/detail', function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    res.render("detail", {user: req.session.user});
  }
})

router.get('/signout', function(req, res, next) {
  debug(req.session.user);
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;