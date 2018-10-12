var timing = 0;
var startFlag = false;
var timer = 0;
var pause = false;
var counting = 0;
var stack1 = [];
var stack2 = [];

window.onload = function(){
	var time = document.getElementById('time');
	var gameButton = document.getElementById('gameButton');
	var info = document.getElementById('info');
	var puzzle = new Array();
	var main = document.getElementById('main');
	var count = document.getElementById('count');

	for(var i = 0; i < 16; i++){
		var temp = document.createElement('li');
		temp.type = "li";
		var str = "parts pos" + parseInt(i) + " area" + parseInt(i);
		temp.className = str;
		main.appendChild(temp);
		puzzle.push(temp);
	};

	gameButton.onclick = function(){
		if(startFlag === false){
			timeCount();
			gameStart();
			startFlag = true;
			if(pause){
				pause = false;
			}
			else{
				init(puzzle);
				counting = 0;
				count.value = counting;
			}
		}
		else{
			clearInterval(timer);
			startFlag = false;
			pause = true;
			gameButton.innerHTML = "Start/Restart Game";
			info.innerHTML = "Pausing…";
		}
	}

	gameButton.ondblclick = function(){
		clearInterval(timer);
		stack1.splice(0, stack1.length);
		timeCount();
		restart();
		init(puzzle);
		gameStart();
		timing = 0;
		time.value = timing;
		counting = 0;
		count.value = counting;
	}

	function restart(){
		for(var i = 0; i < 16; i++){
			puzzle[i].className = "parts pos" + parseInt(i) + " area" + parseInt(i);
		}
	}

	function gameStart(){
		time.value = timing;
		gameButton.innerHTML = "Stop/Restart Game";
		info.innerHTML = "Playing…";
		startFlag = true;
		count.value = counting;
	}

	function init(puzzle){
		var n = 100;
		while(n -= 1){
			var temp1 = Math.floor(Math.random() * 15);
			var temp2 = Math.floor(Math.random() * 15);
			if(temp1 != temp2){
				swap(temp1, temp2);
			}
		}
	}

	function swap(i, j){
		var temp = getArea(puzzle[i]);
		puzzle[i].className = "parts pos" + getPos(puzzle[i]) + " area" + getArea(puzzle[j]);
		puzzle[j].className = "parts pos" + getPos(puzzle[j]) + " area" + temp;
	}

	function getArea(block){
		return parseInt(block.className.substring(block.className.indexOf('area') + 4));
	}

	function getPos(block){
		return parseInt(block.className.substring(9, 11));
	}

	function check(position){
		var row = parseInt(position / 4);
		var col = position % 4;
		if(col > 0){
			if(getArea(puzzle[position - 1]) == 15){
				return getPos(puzzle[position - 1]);
			}
		}
		if(col < 3){
			if(getArea(puzzle[position + 1]) == 15){
				return getPos(puzzle[position + 1]);
			}
		}
		if(row > 0){
			if(getArea(puzzle[position - 4]) == 15){
				return getPos(puzzle[position - 4]);
			}
		}
		if(row < 3){
			if(getArea(puzzle[position + 4]) == 15){
				return getPos(puzzle[position + 4]);
			}
		}
		return -1;
	}

	for(var i = 15; i >= 0; i--){
		puzzle[i].onclick = function(i){
			if(startFlag != true){
				return false;
			}
			var num = getPos(this);
			var chk = check(num);
			if(chk >= 0 && chk <= 15){
				stack1.push(num);
				stack2.push(chk);
				swap(num, chk);
				counting += 1;
				count.value = counting;
				if(winGame()){
					info.innerHTML = "Win!!!";
					startFlag = false;
					pause = false;
					gameButton.innerHTML = "Start Game";
					clearInterval(timer);
					timing = 0;
					counting = 0;
				}
			}
		}
	};

	document.getElementById('recall').onclick = function(){
		if(stack1.length === 0){
			alert("Undo fail! It's the beginning of game.");
		}
		else{
			var temp1 = stack1.length - 1;
			var temp2 = stack2.length - 1;
			swap(stack1[temp1], stack2[temp2]);
			stack1.pop();
			stack2.pop();
			counting -= 1;
			count.value = counting;
		}
	}

	function winGame(){
		for(var i = 0; i < 16; i++){
			var temp = "parts pos" + parseInt(i) + " area" + parseInt(i);
			if(puzzle[i].className != temp){
				return false;
			}
		}
		return true;
	}

	function timeCount(){
		timer = setInterval(timeCounting, 1000);
	}

	function timeCounting(){
		timing += 1;
		time.value = timing;
	}
}