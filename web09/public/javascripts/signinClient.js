$(function() {
  $('.buttons input').click(function() {
    if ($('.username input').val() == '') {
      $('.error').text('请输入用户名');
      return false;
    }
    else if ($('.password input').val() == ''){
      $('.error').text('请输入密码');
      return false;
    }
  });
});