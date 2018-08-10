window.onload = function() {
	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext('2d');
	document.getElementById('start-button').onclick = function() {
		startGame();
	};

	function startGame() {
		var bg = new Image();
		bg.src = './images/bg.png';
		var bird = new Image();
		bird.src = './images/flappy.png';

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
			//birdw: birdw, //width&height
			//birdh: birdh,
			speedX: 0,
			speedY: 0,
			gravity: 1,
			gravitySpeed: 0.9,
			drawbird: function() {
				ctx.drawImage(this.bird, 50, 50);
			}
		};

		function updateCanvas() {
			backgroundImage.move();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			backgroundImage.draw();
			bird.drawbird();
			//		console.log(backgroundImage);
		}
		setInterval(function() {
			updateCanvas();
		}, 5000 / 30);
	}
};
