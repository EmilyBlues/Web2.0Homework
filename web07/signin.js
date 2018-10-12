const http = require('http');
const url = require('url');
const querystring = require('querystring');
const path = require('path');
const fs = require('fs');
var users = [];
var jsonObj;

try{
	fs.readdirSync('./info');
}
catch(err){
	console.log(err);
	console.log('Directory: \'./info\' not found. Making directory...');
	fs.mkdirSync('./info');
}

try{
	fs.readFileSync('./info/users.json');
}
catch(err){
	console.log(err);
	console.log('File: \'users.json\' not found. Creating file...');
	fs.writeFileSync('./info/users.json', '[]');
}

fs.readFile('./info/users.json', function(err, data){
	if(err)
		throw err;
	jsonObj = JSON.parse(data);
	for(var i in jsonObj){
		users.push(jsonObj[i]);
	}
});

var server = http.createServer(function(request, response){
	var extname = path.extname(request.url);
	var temp = './' + request.url;
	switch(extname){
		case ".css":
		case ".js":
		case ".jpg":
		case ".png":
			response.writeHead(200,{
				"Content-Type":{
				".css": "text/css",
				".js": "application/javascript",
				".jpg": "image/jpg",
				".png": "image/png"
				}[extname]
			});
			response.end(fs.readFileSync(temp));
			break;
		default:
			request.method === 'POST' ? registUser(request, response) : sendHtml(request, response);
			break;
	}
});

server.listen(8000);

function registUser(req,res){
	req.on('data', function(chunk){
		var repeat = "";
		var user = querystring.parse(chunk.toString());
		console.log(user);
		var error = "";
		repeat = isRepeated(user.username, user.studentid, user.telNumber, user.email);
		if (repeat != "") {
			if (repeat.indexOf("a") != -1)
				error += "User's name has been used!"; 
			if (repeat.indexOf("b") != -1)
				error += "</br>The Id has been used!";
			if (repeat.indexOf("c") != -1)
				error += "</br>Phone number has been used!";
			if (repeat.indexOf("d") != -1) 
				error += "</br> Email address has been used!";
			errorHTML(error, res);
		}
		else if(repeat == ""){
			users.push(user);
			console.log(users);
			fs.writeFile('./info/users.json', JSON.stringify(users));
			res.writeHead(302, {'Location': '?username=' + user.username});
			showDetail(res, user); 
		}
		res.end();  
	});
}

function sendHtml(request,response){
	var username = parseUsername(request);
	var temp = isRegistedUser(username);
	if(username === ""){
		showSignup(response);
	}
	else if(temp == -1 && isValid(username)){
		showSignup(response);
		//response.writeHead(302, {'Location': 'localhost:8000'});
	}
	else if(!isValid(username)){
		errorHTML("The user's name is invalid!", response);
	}
	else if(isValid(username) && temp != -1){
		showDetail(response,users[temp]);
	}
}

function parseUsername(req){
	var temp = querystring.parse(url.parse(req.url).query).username;
	if(temp == undefined){
		return "";
	}
	return temp;
}
 
function isRegistedUser(name){
	for(var i in users){
		if(users[i].username === name){
			console.log("user's found");
			return i;
		}
	}
	console.log("Not found user");
	return -1;
}

function showSignup(res){
	fs.readFile('./signin.html', 'utf-8', function(err, data) {
		if (err) throw err;
		res.writeHead(200, {"Content-Type": 'text/html'});
		res.write(data);
		res.end();
	});
}

function errorHTML(error, response){
	response.writeHead(200, {"Content-Type":"text/html"});
	response.write("<!DOCTYPE html>"+
'<html>'+
'<head>'+
	'<title>Signin</title>'+
	'<link rel="icon" sizes="131x77" href="images/icon1.png">'+
	'<link rel="stylesheet" type="text/css" href="./css/text.css">'+
'</head>'+
'<body>'+
	'<div id="main">'+
		'<img src="images/icon2.png"/>'+
		'<h1 class="text">Error Attention</h1>'+
		'<div id="error">');
	response.write(error);
	response.write('</div>'+
		'</div>'+
	'</div>'+
'</body>'+
'</html>');
	response.end();
}

function showDetail(response,user){
	response.writeHead(200, {"Content-Type":"text/html"});
	response.write("<!DOCTYPE html>"+
'<html>'+
'<head>'+
	'<title>Signin</title>'+
	'<link rel="icon" sizes="131x77" href="images/icon1.png">'+
	'<link rel="stylesheet" type="text/css" href="./css/text.css">'+
'</head>'+
'<body>'+
	'<div id="main">'+
		'<img src="images/icon2.png"/>'+
		'<h1 class="text">User\'s Infomation</h1>'+
		'<div id="signin">'+
			'<form action="signup" method="post">'+
				'<div type="text" id="name" class="inputClass name" name="username"/>');
	response.write(user.username);
	response.write('</div></br>'+
				'<div type="text" id="studentID" class="inputClass stuID" name="studentid"/>');
	response.write(user.studentid);
	response.write('</div></br>'+
				'<div type="text" id="tel" class="inputClass tel" name="telNumber"/>');
	response.write(user.telNumber);
	response.write('</div></br>'+
				'<div type="text" id="email" class="inputClass email" name="email"/>');
	response.write(user.email);
	response.write('</div></br>'+
			'</form>'+
		'</div>'+
	'</div>'+
'</body>'+
'</html>');
	response.end();
}

isRepeated = function(username, stuid, mobile, email){
	var repeat = "";
	for (var i in users){
		if (users[i].username == username) repeat+="a";
		if (users[i].stuid == stuid) repeat+="b";
		if (users[i].mobile == mobile) repeat+="c";
		if (users[i].email == email) repeat+="d";
	}
	return repeat;
}

isValid = function(name){
	var mat = false;
	if(name.match(/[a-zA-Z]{1}\w{5,16}/) == null){
		mat = false;
	}
	else{
		mat = true;
	}
	if(name.length > 18){
		mat = false;
	}
	return mat;
}