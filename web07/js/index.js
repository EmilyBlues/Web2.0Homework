$(document).ready(function(){
	var nameFlag = false;
	var idFlag = false;
	var telFlag = false;
	var emailFlag = false;

	$('#reset').click(function(){
		$('#name').val("");
		$('#studentID').val("");
		$('#tel').val("");
		$('#email').val("");
	});

	$('#error').hide();

	$('#name').on("input", function(){
		function checkName(name){
			if(name.match(/[a-zA-Z]{1}\w{5,16}/) == null){
				return false;
			}
			else
				return true;
		}
		nameFlag = checkName($(this).val());
		if(nameFlag){
			$('#error').hide();
			$('#error').html("");
		}
		else{
			$('#error').html("Error: User's Name!");
			$('#error').show();
		}
		if($(this).val().length > 18){
			$('#error').html("Error: User's Name!");
			$('#error').show();
		}
	});

	$('#studentID').on("input", function(){
		function checkID(studentID){
			if(studentID.match(/^[1-9]\d{7}$/) == null)
				return false;
			else
				return true;
		}
		idFlag = checkID($(this).val());
		if(idFlag){
			$('#error').html("");
			$('#error').hide();
		}
		else{
			$('#error').html("Error: Student ID!");
			$('#error').show();
		}
	});

	$('#tel').on("input", function(){
		function checkTel(tel){
			if(tel.match(/[^0]{1}\d{10}$/) == null)
				return false;
			else
				return true;
		}
		telFlag = checkTel($(this).val());
		if(telFlag){
			$('#error').html("");
			$('#error').hide();
		}
		else{
			$('#error').html("Error: Telphone Number!");
			$('#error').show();
		}
		if($(this).val().length > 11){
			$('#error').html("Error: Telphone Number!");
			$('#error').show();
		}
	});

	$('#email').on("input", function(){
		function checkEmail(email){
			if(email.match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/) == null)
				return false;
			else
				return true;
		}

		emailFlag = checkEmail($(this).val());
		if(emailFlag){
			$('#error').html("");
			$('#error').hide();
		}
		else{
			$('#error').html("Error: Email!");
			$('#error').show();
		}
	});

	$('input').on("input", function(){
		var name = $('#name').val();
		var id = $('#studentID').val();
		var tel = $('#tel').val();
		var email = $('#email').val();
		if(name.length > 0)
			$('#reset').attr("class", "buttons");
		else if(id.length > 0)
			$('#reset').attr("class", "buttons");
		else if(tel.length > 0)
			$('#reset').attr("class", "buttons");
		else if(email.length > 0)
			$('#reset').attr("class", "buttons");
		else{
			$('#reset').attr("class", "invalidButton");
			$('#error').html("");
			$('#error').hide();
		}
		if(nameFlag && idFlag 
			&& telFlag && emailFlag){
			$('#submit').attr("class", "buttons");
			$('#submit').removeAttr("disabled");

		}
		else{
			$('#submit').attr("class", "invalidButton");
			$('#submit').attr("disabled", true);
		}
	});

	$('#reset').click(function(){
		$('#name').val("");
		$('#studentID').val("");
		$('#tel').val("");
		$('#email').val("");
		$('#error').html("");
		$('#error').hide();
	});

	$('#submit').click(function(){
		if($(this).prop("disabled"))
			return;
		$('form').submit();
		$('#name').val("");
		$('#studentID').val("");
		$('#tel').val("");
		$('#email').val("");
	});
});