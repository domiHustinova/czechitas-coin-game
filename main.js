// ***************************** Preparation *****************************

let monster = document.querySelector('#monster');
let coin = document.querySelector('#coin');
let coinSound = document.querySelector('#coinsound');
let fanfare = document.querySelector('#fanfare');
let music = document.querySelector('#music');
let ghost = document.querySelector('#ghost');
let coffer = ["coin-bronze.png", "coin-silver.png", "coin.png", "gem-yellow.png"];
let selectedCoin;


let monsterWidth = 64;
let monsterHeight = 70;
let monsterSpeed = 60;

let coinWidth = 36;
let coinHeight = 36;

let ghostWidth = 64;
let ghostHeight = 64;

let score = document.querySelector('#score');
let scoreValue = 0;

let life = document.querySelector('#life');
let lifeCount = 5;

let gameOver = false;
let winningScore = 25;

let refreshIntervalId = 0;


placeMonsterStart();
placeCoin();
placeGhost();

function keyPress(event){

	music.play();

	if (!gameOver){
		let key = event.key;

		if (key === 'ArrowRight'){
			monsterX += monsterSpeed;
			monster.src = "pictures/monster-right.png";
				if (monsterX >= window.innerWidth-monsterWidth) {
					monsterX = window.innerWidth-monsterWidth;
				}
		} else if (key === 'ArrowLeft'){
			monsterX -= monsterSpeed;
			monster.src = "pictures/monster-left.png";
				if (monsterX < 0){
					monsterX = 0;
				}
		} else if (key === 'ArrowDown'){
			monsterY += monsterSpeed;
			monster.src = "pictures/monster.png";
				if (monsterY >= window.innerHeight-monsterHeight) {
					monsterY = window.innerHeight-monsterHeight;
				}
		} else if (key === 'ArrowUp'){
			monsterY -= monsterSpeed;
			monster.src = "pictures/monster-up.png";
				if (monsterY < 0){
					monsterY = 0;
				}
		}
		placeMonster();
		if (!( monsterX + monsterWidth < ghostX || ghostX + ghostWidth < monsterX 
			|| monsterY + monsterHeight < ghostY || ghostY + ghostHeight < monsterY)) {
			lifeCount--;
			losingLife();
		} else if (!( monsterX + monsterWidth < coinX || coinX + coinWidth < monsterX 
				|| monsterY + monsterHeight < coinY || coinY + coinHeight < monsterY)) {
				coinSound.play();
		
				scoreValue += selectedCoin + 1;

				if (scoreValue >= winningScore) {
					gameOver = true;
					fanfare.play();
					score.textContent = "You win!";
					coin.style.display = "none";
					clearInterval(refreshIntervalId);
				} else {
					placeCoin();
					score.textContent = scoreValue;
				}
		} //end of else if
 	} //end of gameOver if
} //end of function keyPress

// ***************************** Functions *****************************

function randomGenerator(min,max){
    var randomgen = Math.floor(Math.random()*(max-min+1)+min);
    return randomgen;
}

function move(){
	ghost.style.left = ghostX + 'px';
    ghost.style.top = ghostY + 'px';
    checkBoundary();
    ghostX += moveX;
    ghostY += moveY;

    if (!( monsterX + monsterWidth < ghostX || ghostX + ghostWidth < monsterX 
		|| monsterY + monsterHeight < ghostY || ghostY + ghostHeight < monsterY)) {
		lifeCount--;
		losingLife();
	}
}

function monsterCoinGhostRestart(){
	monster.src = "pictures/monster.png";
	coin.style.display = "block";
	ghost.style.display = "none";

	placeCoin();
	placeMonsterStart();
	placeGhost();
}

function losingLife(){
	if (lifeCount === 0){
		life.textContent = 0;
		gameOver = true;
		clearInterval(refreshIntervalId);
		score.textContent = "Game Over!";
		fanfare.play();
	} else {
		life.textContent = lifeCount;
		monsterCoinGhostRestart();
	}
}

function placeGhost(){
	ghostRandomLocation();
	ghost.style.left = ghostX + 'px';
	ghost.style.top = ghostY + 'px';

	setTimeout(function(){
		ghost.style.display = "block";
		}, 5000);
    moveX = randomGenerator(12,24);
    moveY = randomGenerator(12,24);

    
    clearInterval(refreshIntervalId);
    refreshIntervalId = setInterval(function(){
		move();
		},200)
}	

function checkBoundary(){
	if(ghostX>=(1050)){
    	moveX =-(randomGenerator(12,24));
	}
	if(ghostX<=0){
    	moveX=(randomGenerator(12,24));
	}
	if(ghostY>=(650)){
   		moveY= -(randomGenerator(12,24));
	}
	if(ghostY<=0){
   		moveY=(randomGenerator(12,24));
	}
}

function placeMonster(){
	monster.style.left = monsterX + 'px';
	monster.style.top = monsterY + 'px';
}

function placeMonsterStart(){
	monsterRandomLocation();
	monster.style.left = monsterX + 'px';
	monster.style.top = monsterY + 'px';
}

function placeCoin(){
	selectCoin();
	coinRandomLocation();
	coin.style.left = coinX + 'px';
	coin.style.top = coinY + 'px';
}

function coinRandomLocation(){
	coinX = randomGenerator(1,(window.innerWidth-coinWidth));
	coinY = randomGenerator(1,(window.innerHeight-coinHeight));
}

function ghostRandomLocation(){
	ghostX = randomGenerator(1,(window.innerWidth-ghostWidth));
	ghostY = randomGenerator(1,(window.innerHeight-ghostHeight));
}

function monsterRandomLocation(){
	monsterX = randomGenerator(1,(window.innerWidth-monsterWidth));
	monsterY = randomGenerator(1,(window.innerHeight-monsterHeight));
}

function selectCoin(){
	selectedCoin = Math.floor(Math.random()*coffer.length);
	coin.src = "pictures/" + coffer[selectedCoin];	
}

function restartGame() {
	monsterCoinGhostRestart();
	scoreValue = 0;
	lifeCount = 5;
	score.textContent = 0;
	life.textContent = 5;
	gameOver = false;
}