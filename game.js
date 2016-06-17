window.onload = init;

var map;
var ctxMap;

var drawBtn;
var clearBtn;

var stats;
var ctxStats;

var pl;
var ctxPl;

var enemyCv;
var ctxEnemy;

var gameWidth = 800;
var gameHeight = 480;

var bg = new Image();
bg.src = "img/bg2.png";

var bg1 = new Image();
bg1.src = "img/bg2.png";

var plTiles = new Image();
plTiles.src = "img/player1.png";

var enemyTiles = new Image();
enemyTiles.src = "img/enemy1.png";

var mapX = 0;
var map1X = gameWidth;

var player;
var enemies = [];

var seconds=0;

var isPlaying;

//For creating enemies
// var tekDate = new Date();
var health;
var looseWindow;

var score1;
var spawnInterval;
var spawnTime = 3800;
var spawnAmount = 6;

var requestAnimFrame = window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimationFrame;

function init(){
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	map.width= gameWidth;
	map.height = gameHeight;

	pl = document.getElementById("map");
	ctxPl = map.getContext("2d");

	enemyCv = document.getElementById("enemy");
	ctxEnemy = map.getContext("2d");

	stats = document.getElementById("stats");
	ctxStats = stats.getContext("2d");

	pl.width= gameWidth;
	pl.height = gameHeight;

	stats.width= gameWidth;
	stats.height = gameHeight;
	
	ctxStats.fillStyle = "#303031";
	ctxStats.font = "bold 15pt Arial" 

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn")

	drawBtn.addEventListener("click", drawRect,false );
	clearBtn.addEventListener("click", clearRect,false ); 

	
	player = new Player();
	// enemy = new Enemy();
	
	// drawPlayar();
	// draw();
	startLoop();
	health = 100;
	

	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);

}

function spawnEnemy(count){
	for(var i=0;i < count;i++){
		enemies[i] = new Enemy();
	}
}

function loop(){
	if(isPlaying){
		draw();
		update();

		
		requestAnimFrame(loop) ;
	}
}

function startCreatingEnemies(){
	stopCreatingEnemies();
	spawnInterval = setInterval(function(){spawnEnemy(spawnAmount)},spawnTime);

}

function stopCreatingEnemies(){
	clearInterval(spawnInterval);
}

function startLoop(){
	isPlaying = true;
	loop();
	startCreatingEnemies();
}

function stopLoop(){
	isPlaying=false;
}
function draw(){
	drawBg();
	player.draw();
	// enemy.draw();
	for(var i = 0;i < enemies.length;i++){
		enemies[i].draw();
	}
}

function update(){
	score();
	moveBg();
	updateStats();

	player.update();
	// enemy.update();
	for(var i = 0;i < enemies.length;i++){
		enemies[i].update();
	}
}
function score(){
	seconds++;
	
	console.log(seconds);
}
function scoreMain(){
	clearCtxPlayer();

	score1=seconds;
}
function moveBg(){
	var vel = 4;
	mapX -=vel;
	map1X -=vel;
	if(mapX+gameWidth < 0) mapX = gameWidth - 5;
	if(map1X+gameWidth < 0) map1X = gameWidth - 5;
}

function Player(){
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 0;
	this.drawY = 100;
	this.width = 130;
	this.height = 77;

	this.isUp = false;
	this.isDown = false;
	this.isRight = false;
	this.isLeft = false;	

	this.speed = 5;
}

function Enemy(){
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = Math.floor(Math.random()*gameWidth)+gameWidth;
	this.drawY = Math.floor(Math.random()*gameHeight );
	this.width = 77;
	this.height = 62;

	this.speed = 7;
}

Enemy.prototype.draw = function (){
	

	ctxEnemy.drawImage(enemyTiles, this.srcX, this.srcY, this.width,
		 this.height, this.drawX, this.drawY, this.width, this.height);
}

Enemy.prototype.update = function (){
	this.drawX -=7;
	if(this.drawX + this.width < 0){
		this.destroy();
		// this.drawX=Math.floor(Math.random()*gameWidth)+ gameWidth;
		// this.drawY=Math.floor(Math.random()*gameHeight);
	}
	// ctxEnemy.drawImage(enemyTiles, this.srcX, this.srcY, this.width,
	// 	 this.height, this.drawX, this.drawY, this.width, this.height);
}

Enemy.prototype.destroy = function(){
	enemies.splice(enemies.indexOf(this),1);
}

Player.prototype.draw = function (){

		clearCtxEnemy();
		drawBg();
		ctxPl.drawImage(plTiles, this.srcX, this.srcY, this.width,
		 this.height, this.drawX, this.drawY, this.width, this.height);

}

Player.prototype.update = function (){

	if(this.drawX <0) this.drawX = 0;
	if(this.drawX > gameWidth - this.width) this.drawX = gameWidth - this.width;
	if(this.drawY <0) this.drawY = 0;
	if(this.drawY >gameHeight - this.height) this.drawY = gameHeight - this.height;

	for(var i = 0;i < enemies.length;i++){
		if(this.drawX >= enemies[i].drawX &&
			 this.drawY >= enemies[i].drawY && 
			 this.drawX <= enemies[i].drawX  + enemies[i].width && 
			 this.drawY <= enemies[i].drawY  + enemies[i].width){

			health=health-10;
			if(health <= 0) {

				Loose();
				scoreMain();
			}
		}
	}
	

	this.chooseDir();
}
function Loose(){

	document.getElementById("seconds").value = score1;
	looseWindow = document.getElementById("looseWindow");
	looseWindow.setAttribute('style', 'display: block;');
	// ctxlooseWindow.clearRect(0, 0, gameWidth, gameHeight);
}
// function stop(){
// 	if (go==0) {setTimeout(moveBg, 7000);}
// }
function again(){
	health = 100;	
	seconds = 0;
	drawPlayar();
	looseWindow.setAttribute('style', 'display: none;');
}
function plane(){
	if (seconds>=1500) {
	plTiles.src = "img/plane2.png";
	player.height = 87;
	player.speed =9;
	alert("You have new plane!!!");
	}else alert("Score must be equal to 1500!!!");
}
Player.prototype.chooseDir = function (){
	if(this.isUp){
		this.drawY -=this.speed;
	}
	if(this.isDown){
		this.drawY +=this.speed;
	}
	if(this.isRight){
		this.drawX +=this.speed;
	}
	if(this.isLeft){
		this.drawX -=this.speed;
	}
}

function checkKeyDown(e){
	var keyId = e.keyCode || e.which;
	var keyChar = String.fromCharCode(keyId);

	if(keyChar == "W"){
		player.isUp = true;
		e.preventDefault();
	}

	if(keyChar == "S"){
		player.isDown = true;
		e.preventDefault();
	}

	if(keyChar == "D"){
		player.isRight = true;
		e.preventDefault();
	}

	if(keyChar == "A"){
		player.isLeft = true;
		e.preventDefault();
	}
}

function checkKeyUp(e){
	var keyId = e.keyCode || e.which;
	var keyChar = String.fromCharCode(keyId);

	if(keyChar == "W"){
		player.isUp = false;
		e.preventDefault();
	}

	if(keyChar == "S"){
		player.isDown = false;
		e.preventDefault();
	}

	if(keyChar == "D"){
		player.isRight = false;
		e.preventDefault();
	}

	if(keyChar == "A"){
		player.isLeft = false;
		e.preventDefault();
	}
}

function drawRect(){
	ctxMap.fillStyle = "#3D3D3D";
	ctxMap.fillRect(10, 10, 100, 100);
}
function clearRect(){
	ctxMap.clearRect(0, 0, 800, 500);
}
function drawBg(){
	ctxMap.clearRect( 0, 0, gameWidth, gameHeight);
	ctxMap.drawImage(bg, 0, 0, 800, 480, mapX, 0, 800, 480);
	ctxMap.drawImage(bg1, 0, 0, 800, 480, map1X, 0, 800, 480);
}

function clearCtxPlayer(){
	ctxPl.clearRect(0, 0, gameWidth, gameHeight);
}

function clearCtxEnemy(){
	ctxEnemy.clearRect(0, 0, gameWidth, gameHeight);
}

function updateStats(){
	ctxStats.clearRect(0, 0, gameWidth, gameHeight);
	ctxStats.fillText("Health:" + health +";"+"Score"+seconds, 10, 30 )
}

function drawPlayar(){
	ctxMap.drawImage(plTiles, 0, 0, 130, 77, 0, 0, 130, 77);
}