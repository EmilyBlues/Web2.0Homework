var validator = {
  username: {
    isValid: function(user) {
      var valid = /^[a-zA-Z][\w_]{5,17}$/.test(user.username);
      if (!valid)
        throw "6~18位英文字母、数字或下划线，必须以英文字母开头"
    },
    isRepeated: function(users, username) {
      users.filter(function(user) {
        if(user.username == username)
          throw "existed username";
      });
    }
  },

  password: {
    isValid: function(user) {
      var valid = /^[\w\-]{6,12}$/.test(user.password);
      if (!valid)
        throw "6~12位数字、大小写字母、中划线、下划线";
    }
  },

  confirm: {
    isValid: function(user) {
      if (user.confirm != user.password)
        throw "密码不一致";
    }
  },

  s_id: {
    isValid: function(user) {
      var valid = /^[1-9]\d{7}$/.test(user.s_id);
      if (!valid)
        throw "8位数字，不能以0开头";
    },
    isRepeated: function(users, s_id) {
      users.filter(function(user) {
        if(user.s_id == s_id)
          throw "existed s_id";
       });
    }
  },

  phone: {
    isValid: function(user) {
      var valid = /^[1-9]\d{10}$/.test(user.phone);
      if (!valid)
        throw "11位数字，不能以0开头";
    },
    isRepeated: function(users, phone) {
      users.filter(function(user) {
        if(user.phone == phone)
          throw "existed phone";
       });
    }
  },

  email: {
    isValid: function(user) {
      var valid = /^[\w_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(user.email)
      if (!valid)
        throw "请输入合法邮箱";
    },
    isRepeated: function(users, email) {
      users.filter(function(user) {
        if(user.email == email)
          throw "existed email";
       });
    }
  },

  isFormValid: function(user) {
    validator.username.isValid(user);
    validator.password.isValid(user);
    validator.s_id.isValid(user);
    validator.phone.isValid(user);
    validator.email.isValid(user);
  },

  isAttrRepeated: function(users, user) {
    validator.username.isRepeated(users, user.username);
    validator.s_id.isRepeated(users, user.id);
    validator.phone.isRepeated(users, user.phone);
    validator.email.isRepeated(users, user.email);
  },

  checkUser: function(users, user) {
    validator.isFormValid(user);
    validator.isAttrRepeated(users, user);
  }
}

if (typeof exports == 'object') {
  exports.validator = validator;
}
