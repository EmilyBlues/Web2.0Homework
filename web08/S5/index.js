$(document).ready(function(){

	$('#at-plus-container').mouseenter(function(event){
		event.stopPropagation();
		$('span').hide();
		$('#info-bar').text('');
		$('#sum').text('');
		$('#info-bar').unbind('click');
		$('#info-bar').attr("class", "disable");
		$('.liButton').removeClass('leave');
		buttonAble();
		$('.icon').unbind('click').bind('click', iconClick);
		$('#message').text("");
	});

	$('#at-plus-container').mouseleave(function(){
		$('.liButton').addClass('leave');
	});

	function buttonClick(event){
		$(event.target).children().show();
		$(event.target).children().text('...');
		buttonDisable();
		$(event.target).attr("class", "liButton able");
		$.get('/', function(data, status){
			if($(event.target).hasClass('leave'))
				return;
			if(status == 'success'){
				buttonAble();
				$(event.target).unbind('click', buttonClick);
				$(event.target).attr("class", "liButton disable");
				$(event.target).children().text(data);
				if(check()){
					infoAble();
				}
			}
		});
	}

	function buttonDisable(){
		$('.liButton').unbind('click');
		$('.liButton').attr("class", "liButton disable");
		$('#info-bar').attr("class", "disable");
		$('#info-bar').unbind('click', bubbleHandle);		
	}

	function buttonAble(){
		$('.liButton').unbind('click');
		$('.liButton').bind('click', buttonClick);
		$('.liButton').attr("class", "liButton able");		
	}

	function infoAble(){
		$('#info-bar').attr("class", "able");
		$('#info-bar').unbind('click');
		$('#info-bar').bind('click', bubbleHandle);
	}

	function check(){
		for(var i = 1; i <= 5; i++){
			if($('.liButton:nth-child('+i+')').children().text() == "")
				return false;
		}
		return true;
	}

	function aHandle(err, sum, count, callback){
		var target = $('#A');
		target.children().show().text("...");
		buttonDisable();
		target.attr("class", "liButton able");
		$('#click').attr("class", "icon");
		$.get('/', function(data, status){
			if(target.hasClass('leave'))
				return;
			if(status == 'success'){
				buttonAble();
				target.unbind('click', buttonClick);
				target.attr("class", "liButton disable");
				target.children().text(data);
				count += 1;
				if(count >= 5){
					infoAble();
				}
				if(err){
					var mes={
						'message': 'A: 这不是天大的秘密',
						'sum': sum+parseInt(data)
					}
					return mes;
				}
				else{
					var haveMes = $('#message').html();
					$('#message').html(haveMes+'<br/>A: 这是个天大的秘密');
				}
				if(callback){
					var mes = callback(null, sum+parseInt(data), count);
					if(mes){
						var temp = $('#message').text();
						$('#message').html(temp+mes+'<br/>');
					}
				}
			}
		});
	}

	function bHandle(err, sum, count, callback){
		var target = $('#B');
		target.children().show().text("...");
		buttonDisable();
		target.attr("class", "liButton able");
		$('#click').attr("class", "icon");
		$.get('/', function(data, status){
			if(target.hasClass('leave'))
				return;
			if(status == 'success'){
				buttonAble();
				target.unbind('click', buttonClick);
				target.attr("class", "liButton disable");
				target.children().text(data);
				count += 1;
				if(count >= 5){
					infoAble();
				}
				if(err){
					var mes={
						'message': 'B: 我知道',
						'sum': sum+parseInt(data)
					}
					return mes;
				}
				else{
					var haveMes = $('#message').html();
					$('#message').html(haveMes+ '<br/>B: 我不知道');
				}
				if(callback){
					var mes = callback(null, sum+parseInt(data), count);
					if(mes){
						var temp = $('#message').text();
						$('#message').html(temp+mes+'<br/>');
					}
				}
			}
		});
	}

	function cHandle(err, sum, count, callback){
		var target = $('#C');
		target.children().show().text("...");
		buttonDisable();
		target.attr("class", "liButton able");
		$('#click').attr("class", "icon");
		$.get('/', function(data, status){
			if(target.hasClass('leave'))
				return;
			if(status == 'success'){
				buttonAble();
				target.unbind('click', buttonClick);
				target.attr("class", "liButton disable");
				target.children().text(data);
				count += 1;
				if(count >= 5){
					infoAble();
				}
				if(err){
					var mes={
						'message': 'C: 你知道',
						'sum': sum+parseInt(data)
					}
					return mes;
				}
				else{
					var haveMes = $('#message').html();
					$('#message').html(haveMes+'<br/>C: 你不知道');
				}
				if(callback){
					var mes = callback(null, sum+parseInt(data), count);
					if(mes){
						var temp = $('#message').text();
						$('#message').html(temp+mes+'<br/>');
					}
				}
			}
		});
	}

	function dHandle(err, sum, count, callback){
		var target = $('#D');
		target.children().show().text("...");
		buttonDisable();
		target.attr("class", "liButton able");
		$('#click').attr("class", "icon");
		$.get('/', function(data, status){
			if(target.hasClass('leave'))
				return;
			if(status == 'success'){
				buttonAble();
				target.unbind('click', buttonClick);
				target.attr("class", "liButton disable");
				target.children().text(data);
				count += 1;
				if(count >= 5){
					infoAble();
				}
				if(err){
					var mes={
						'message': 'D: 他知道',
						'sum': sum+parseInt(data)
					}
					return mes;
				}
				else{
					var haveMes = $('#message').html();
					$('#message').html(haveMes+'<br/>D: 他不知道');
				}
				if(callback){
					var mes = callback(null, sum+parseInt(data), count);
					if(mes){
						var temp = $('#message').text();
						$('#message').html(temp+mes+'<br/>');
					}
				}
			}
		});
	}

	function eHandle(err, sum, count, callback){
		var target = $('#E');
		target.children().show().text("...");
		buttonDisable();
		target.attr("class", "liButton able");
		$('#click').attr("class", "icon");
		$.get('/', function(data, status){
			if(target.hasClass('leave'))
				return;
			if(status == 'success'){
				buttonAble();
				target.unbind('click', buttonClick);
				target.attr("class", "liButton disable");
				target.children().text(data);
				count += 1;
				if(count >= 5){
					infoAble();
				}
				if(err){
					var mes={
						'message': 'E: 不怪',
						'sum': sum+parseInt(data)
					}
					return mes;
				}
				else{
					var haveMes = $('#message').html();
					$('#message').html(haveMes+'<br/>E: 才怪');
				}
				if(callback){
					var mes = callback(null, sum+parseInt(data), count);
					if(mes){
						var temp = $('#message').text();
						$('#message').html(temp+mes+'<br/>');
					}
				}
			}
		});
	}

	function bubbleHandle(err, sum, count){
		if(err){
			var mes = {
				'message': '大气泡：楼主异步调用战斗力不感人，目测超过'+sum,
				'sum': sum
			}
			return mes;
		}
		else{
			var haveMes = $('#message').html();
			$('#message').html(haveMes + '<br/>大气泡：楼主异步调用战斗力感人，目测不超过' + sum)
		}
		var temp = $('#order').text();
		$('#info-bar').html('<div id="order">'+temp+'<br/></div><div>'+sum+'</div>');
		$('#info-bar').attr("class", "disable");
		$('.icon').unbind('click').bind('click', iconClick);
		buttonAble();
	}

	function iconClick(event){
		$(event.target).unbind('click', iconClick).bind('click');
		count = 0;
		$('#message').text("");
		var functions = [aHandle, bHandle, cHandle, dHandle, eHandle];
		$('#click').attr("class", "icon");
		event.stopPropagation();
		var order = [];
		for(var j = 0; j < 5; j++){
			var temp = Math.round(Math.random() * 4);
			order[j] = temp;
			for(var d = 0; d < j; d++){
				if(order[d] == temp)
					j -=1;
			}
		}
		var orderResult = tostring(order);
		$('#info-bar').html('<div id="order">'+orderResult+'</div>');
		var callbacks = [];
		for(var i = 0; i < 4; i++){
			(function(i){
				callbacks[i] = function(err, sum, count){
					functions[order[i+1]](err, sum, count, callbacks[i+1]);
				}
			})(i);
		}
		callbacks[4] = function(err, sum, count){
			bubbleHandle(err, sum, count);
		}
		functions[order[0]](null, 0, 0, callbacks[0]);
	}

	function tostring(array){
		var res = "";
		for(var i = 0; i < 5; i++){
			res += String.fromCharCode(65 + array[i]);
			if(i < 4)
				res += ",";
		}
		return res;
	}

});