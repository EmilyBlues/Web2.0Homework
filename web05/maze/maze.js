var gameStart = false;
var cheat = false;
var touch = false;
var flag = 0;

window.onload = function(){
	var gameInfo = document.getElementById('gameInfo');
	var walls = document.getElementsByClassName("walls");
	var roads = document.getElementsByClassName("roads");

	document.getElementById('start').onmouseover = function(){
		gameStart = true;
		cheat = false;
		flag = 0;
		gameInfo.innerHTML = "<h2>Game Start!<h2>";

		for(var i = walls.length - 1; i >= 0; i--){
			walls[i].onmouseout = function(){
				this.className = "walls";
			}
		};
	}

	document.getElementById('cheat').onmouseover = function(){
		flag = 1;
	}

	for(var i = walls.length - 1; i >= 0; i--){
		walls[i].onmouseover = function(){
			if(gameStart){
				this.className = "wallsFail";
				gameInfo.innerHTML = "<h2>You Lose!</h2>";
				gameStart = false;
				touch = true;
			}
		}
	};

	document.getElementById('end').onmouseover = function(){
		if(flag === 1){
			cheat = true;
		}
		if(gameStart){
			if(cheat){
				gameInfo.innerHTML =
				"<h2>Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!</h2>";
			}
			else{
				gameInfo.innerHTML = "<h2>You Win!</h2>";
			}
			gameStart = false;
			cheat = true;
		}
		else{
			gameInfo.innerHTML = "<h2>You should start from the 'S' first.</h2>";
		}
	}
}
