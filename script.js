window.onload = function() {
	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext('2d');
	var cvheight = ctx.canvas.height;
	var interval = 20;
	var speed = -10;
	var startButton = document.getElementById('start-button');
	startButton.onclick = function() {
		startButton.classList.toggle('pressed');
		startGame();
	};

	function startGame() {
		var bg = new Image();
		bg.src = './images/bg.png';
		var bird = new Image();
		bird.src = './images/flappy.png';
		var obstacleBot = new Image();
		obstacleBot.src = './images/obstacle_bottom.png';
		var obstacleTop = new Image();
		obstacleTop.src = './images/obstacle_top.png';

		var backgroundImage = {
			bg: bg,
			bgx: 0,
			move: function() {
				this.bgx += speed;
				this.bgx %= canvas.width;
			},
			draw: function() {
				ctx.drawImage(this.bg, this.bgx, 0);

				if (speed < 0) {
					ctx.drawImage(this.bg, this.bgx + this.bg.width, 0);
				} else {
					ctx.drawImage(this.bg, this.bfx - this.bg.width, 0);
				}
			}
		};

		var bird = {
			bird: bird,
			//width: 20, //width&height
			height: 50,
			speedX: 0,
			speedY: 0,
			gravity: 10,
			gravitySpeed: 0.9,

			move: function() {
				this.height += this.gravity;
				this.gravity = 10;
				this.gravitySpeed++;
			},

			drawbird: function() {
				ctx.save();
				//	ctx.rotate(this.gravitySpeed * Math.PI / 180);
				ctx.drawImage(this.bird, 75, this.height, 50, 35);
				ctx.restore();
			}
		};

		var obstacles = {
			//to be fixed: push obstacles in array, update the array every n intervalId
			obstacleArray: [],
			obstacleBot: obstacleBot,
			obstacleTop: obstacleTop,
			newx: canvas.width,

			//x: Math.floor(Math.random() * Math.floor(canvas.width)),
			gap: Math.floor(Math.random() * Math.floor(100) - 520),
			bottY: Math.floor(Math.random() * Math.floor(220) + 180),
			//createObstacles: function(){},

			pushObstacles: function() {
				var gapX = Math.floor(Math.random() * Math.floor(100) + 100);
				this.obstacleArray.push(canvas.width + gapX);
			},
			move: function() {
				for (i = 0; i < this.obstacleArray.length; i++) {
					this.obstacleArray[i] -= 10;
				}
				console.log(this.obstacleArray);
				//this.obstacleArray.map((x) => console.log((x += speed)));
			},
			drawobup: function() {
				ctx.save();
				//this.obstacleArray.forEach((element) => {
				this.obstacleArray.map((x) => {
					ctx.drawImage(
						this.obstacleBot,
						x,
						this.bottY,
						this.obstacleBot.width / 2,
						this.obstacleBot.height / 2
					);
					ctx.drawImage(
						this.obstacleTop,
						x,
						this.bottY + this.gap,
						this.obstacleBot.width / 2,
						this.obstacleBot.height / 2
					);
				});
				//});
				ctx.restore();
			}
		};

		document.onkeydown = function(e) {
			//bird.gravitySpeed -= 2;
			bird.gravity *= -1; // key 'W'
			console.log('up');
		};
		function updateCanvas() {
			backgroundImage.move();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			backgroundImage.draw();
			bird.move();
			bird.drawbird();
			//console.log(cvheight);
			obstacles.move();
			obstacles.drawobup();
			//		console.log(backgroundImage);
		}

		var intervalId = setInterval(function() {
			interval++;
			//console.log('interval:', interval);
			updateCanvas();
			if (interval % 20 === 0) {
				obstacles.pushObstacles();
			}
			if (bird.height >= cvheight) {
				clearInterval(intervalId);
				ctx.fillStyle = 'green';
				ctx.fillText('YOU LOST', 240, 100);
			}
		}, 5000 / 30);
	}
};
