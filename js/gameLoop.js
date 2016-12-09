var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 520;

document.body.appendChild(canvas);



//Cenário
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;	
};
bgImage.src = "./imagem/background.jpg"





//Jogador
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function(){
	playerReady = true;	
};
playerImage.src = "./imagem/player.png"





//Bau
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;	
};
monsterImage.src = "./imagem/monster.png"



// Barco Preto
var barcoReady = false;
var barcoImage = new Image();
barcoImage.onload = function(){
	barcoReady = true;	
};
barcoImage.src = "./imagem/BarcoPreto.png"




//Configurações
var player = {
	speed: 256
};
var monster = {};
var monstersCaught = 0;

var barco = {};
var barcoCaught = 0;

var keysDown = {};
addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

var reset = function (){

	
	player.x = canvas.width / 2;
	player.y = canvas.height / 2;
	
	monster.x = 32 + (Math.random() * (canvas.width - 128));
	monster.y = 32 + (Math.random() * (canvas.height - 128));


	barco.x = 32 + (Math.random() * (canvas.width - 60));
	barco.y = 32 + (Math.random() * (canvas.height - 60));


};




//controles do jogador
var update = function(modifier){
	if(37 in keysDown){
		player.x -= player.speed * modifier //esquerda
	}
	if(38 in keysDown){
		player.y -= player.speed * modifier //cima
	}
	if(39 in keysDown){
		player.x += player.speed * modifier //direita
	}
	if(40 in keysDown){
		player.y += player.speed * modifier //baixo
	}


//condicao de vitoria
 		if(monstersCaught >= 5 )
 	{
  	alert("Parabens você conseguiu salvar todos habitantes do seu planeta ");
  	 window.location.reload();
  	}



  	if (barcoCaught == 1) 
  	{
  		alert("Seu planeta morreu, você conseguiu salvar apenas " + monstersCaught +"Habitantes");
		window.location.reload();
  	}

	
	//colisão
	if(player.x <= (monster.x + 20)
	&& monster.x <= (player.x + 20)
	&& player.y <= (monster.y + 20)
	&& monster.y <= (player.y + 20))

	{
		++monstersCaught;		
		reset();


	}
	
	if( player.y <= (barco.y + 20)
	&& barco.y <= (player.y + 20)
	&& player.x <= (barco.x + 20)
	&& barco.x <= (player.x + 20))
	{	
		++barcoCaught;
		window.location.reload();
	}

};






//Desenhar na tela
var render = function(){
	if(bgReady){
		ctx.drawImage(bgImage, 0, 0);
	}
	if(playerReady){
		ctx.drawImage(playerImage, player.x, player.y);
	}
	if(monsterReady){
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	if(barcoReady){
		ctx.drawImage(barcoImage, barco.x, barco.y);
	}
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.font = "24px Verdana";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText ("Habitantes salvos " + monstersCaught, 32, 32);
	
};






//Loop do jogo
var main = function(){
	var now = Date.now();
	var delta = now - then;
	
	update(delta / 1000);
	render();
	
	then = now;
};

//iniciar o jogo
reset();
var then = Date.now();
setInterval(main, 1);


