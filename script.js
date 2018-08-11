window.onload = function() {
	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext('2d');
	var startButton = document.getElementById('start-button');
	startButton.onclick = function() {
		startButton.classList.toggle('pressed');
		startGame();
		console.log(startButton);
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
			speed: -10,
			move: function() {
				this.bgx += this.speed;
				this.bgx %= canvas.width;
			},
			draw: function() {
				ctx.drawImage(this.bg, this.bgx, 0);

				if (this.speed < 0) {
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

		var obstacleBot = {
			obstacleBot: obstacleBot,
			x: 500,
			move: function() {
				this.x -= 10;
			},
			drawobup: function() {
				ctx.save();
				//	ctx.rotate(this.gravitySpeed * Math.PI / 180);
				console.log(this.x);
				ctx.drawImage(this.obstacleBot, this.x, 0);
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
			obstacleBot.move();
			obstacleBot.drawobup();
			//		console.log(backgroundImage);
		}
		setInterval(function() {
			updateCanvas();
		}, 5000 / 30);

		if (bird.height <= 0) {
			clearInterval();
		}
	}
};
