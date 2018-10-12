$(document).ready(function(){
	var count = 0;
	$('#at-plus-container').mouseenter(function(event){
		event.stopPropagation();
		$('span').hide();
		$('#info-bar').text('');
		$('#info-bar').unbind('click');
		$('#info-bar').attr("class", "disable");
		$('.liButton').removeClass('noshow');
		$('.liButton').removeClass('leave');
		buttonAble();
		$('.icon').unbind('click').bind('click', iconClick);
		count = 0;
	});

	$('#at-plus-container').mouseleave(function(){
		$('.liButton').addClass('leave');
	});

	function buttonClick(event){
		$(event.target).children().show();
		$(event.target).children().text('...');
		buttonDisable();
		$(event.target).attr("class", "liButton able");
		$.post('/', function(data, status){
			if($(event.target).hasClass('leave'))
				return;
			if(status == 'success'){
				$(event.target).attr("class", "liButton disable noshow");
				buttonAble();
				$(event.target).unbind('click', buttonClick);
				$(event.target).children().text(data);
				if(check()){
					infoAble();
				}
			}
		});
	}

	function buttonDisable(){
		for(var i = 1; i <= 5; i++){
			if(!$('.liButton:nth-child('+i+')').hasClass('noshow'))
				$('.liButton:nth-child('+i+')').attr("class", "liButton disable");
		}
		$('.liButton').unbind('click');
		$('#info-bar').unbind('click', infoClick);		
	}

	function buttonAble(){
		for(var i = 1; i <= 5; i++){
			if(!$('.liButton:nth-child('+i+')').hasClass('noshow')){
				$('.liButton:nth-child('+i+')').attr("class", "liButton able");
				$('.liButton:nth-child('+i+')').unbind('click').bind('click', buttonClick);
			}
			else{
				$('.liButton:nth-child('+i+')').unbind('click', buttonClick);
			}
		}		
	}

	function infoAble(){
		$('#info-bar').attr("class", "able");
		$('#info-bar').unbind('click');
		$('#info-bar').bind('click', infoClick);
	}

	function check(){
		for(var i = 1; i <= 5; i++){
			if($('.liButton:nth-child('+i+')').children().text() == "" 
				|| $('.liButton:nth-child('+i+')').children().text() == "...")
				return false;
		}
		return true;
	}

	function infoClick(event){
		if($('.liButton').hasClass('leave'))
			return;
		var sum = 0;
		for(var i = 1; i <= 5; i++){
			sum += parseInt($('.liButton:nth-child('+i+')').children().text());
			$('.liButton:nth-child('+i+')').attr("class", "liButton able");
		}
		$('#info-bar').text(sum);
		$('#info-bar').attr("class", "disable");
		$('.icon').unbind('click').bind('click', iconClick);
		buttonAble();
	}

	function iconClick(event){
		event.stopPropagation();
		$(event.target).unbind('click', iconClick);
		count = 0;
		function callback(err, num){
			if(num == 5){
				infoClick();
			}
		}
		for(var i = 0; i < 5; i++){
			if($('.liButton').hasClass('leave')){
				return;
			}
			(function(i){
				getRandom($($('.liButton')[i]), callback);
			})(i);
		}
	}

	function getRandom(target, callback){
		if(target.hasClass('leave'))
			callback("error", count);
		$(target).children().show().text("...");
		buttonDisable();
		$(target).attr("class", "liButton able");
		$('#click').attr("class", "icon");
		$.post('/', function(data, status){
			if(target.hasClass('leave'))
				callback("error", count);
			if(status == 'success'){
				$(target).attr("class", "liButton disable noshow");
				buttonAble();
				$(target).unbind('click', buttonClick);
				$(target).attr("class", "liButton disable noshow");
				$(target).children().text(data);
				count += 1;
				if(count >= 5){
					infoAble();
				}
				callback(null, count);
			}
		});
	}

});