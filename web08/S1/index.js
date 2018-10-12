$(document).ready(function(){

	$('#at-plus-container').mouseenter(function(event){
		event.stopPropagation();
		$('span').hide();
		$('#info-bar').text('');
		$('#info-bar').bind('click');
		$('#info-bar').attr("class", "disable");
		$('#sum').text("");
		$('.liButton').removeClass('noshow');
		buttonAble();
		infoClear();
	});

	function buttonClick(event){
		$(event.target).children().show();
		$(event.target).children().text('...');
		buttonDisable();
		$(event.target).attr("class", "liButton able");
		$.get('/', function(data, status){
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

	function check(){
		for(var i = 1; i <= 5; i++){
			if($('.liButton:nth-child('+i+')').children().text() == "")
				return false;
		}
		return true;
	}

	function infoClear(){
		for(var i = 1; i <= 5; i++){
			$('.liButton:nth-child('+i+')').children().text("");
		}
	}

	function infoClick(event){
		var sum = 0;
		for(var i = 1; i <= 5; i++){
			sum += parseInt($('.liButton:nth-child('+i+')').children().text());
			$('.liButton:nth-child('+i+')').attr("class", "liButton able");
		}
		$('#info-bar').text(sum);
		$('#info-bar').attr("class", "disable");
		buttonAble();
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
});