$(function() {
  
  var user = {username: '', password: '', confirm: '', s_id: '', phone: '', email: ''};
  var repeated = {};

  $('input:not(.button)').blur(function() {
    user[this.id] = this.value;
    try {
      validator[this.id].isValid(user);
      if (this.id != 'password' && this.id != 'confirm')
        checkRepeated($(this), this.value);
      $(this).siblings('.error').css("opacity", 0);
    } catch(error) {
      $(this).siblings('.error').text(error).css("opacity", 1);
    }
  });

  $('.submit').click(function() {
    try {
      validator.isFormValid(user);
      checkFormRepeated();
    } catch(err) {
      return false;
    }
  });

  function checkRepeated($input, val) {
    var valueObject = {value: val, checkType: $input.attr("id")};
    $.post("/checkRepeated", valueObject, function(data, textStatus) {
      if (data.toString() === "fail") {
        var repeatedType = $input.attr('placeholder');
        $input.siblings('.error').text(repeatedType + "重复").css("opacity", 1);
        repeated[$input.attr("id")] = true;
      } else {
        repeated[$input.attr("id")] = false;
      }
    });
  }

  function checkFormRepeated() {
    for (var key in repeated) {
      if (repeated[key] == true)
        throw new Error("repeated");
    }
  }
});