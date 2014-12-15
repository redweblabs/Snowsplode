var __let_it = (function(){

	'use strict';

	var cnvs = document.getElementById('snow'),
		ctx = cnvs.getContext('2d'),
		logo = new Image(),
		flake = new Image(),
		shouldDraw = true,
		red = false;

	var snow = undefined,
		snowCount = 20,
		particles = undefined,
		wCount = 0,
		props = 7,
		particleProps = 5;

	window.requestAnimationFrame = (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame);

	function pop(which){

		 var offset = particleProps * which * wCount,
		 	 k = offset,
		 	 max = offset + (particleProps * wCount);

		 while(k < max){
		 	//X
		 	particles[k] = snow[which * props];
		 	//Y
		 	particles[k + 1] = snow[(which * props) + 1];
		 	//VX
		 	particles[k + 2] = (Math.random() * 5) - (Math.random() * 5);
		 	//VY
		 	particles[k + 3] = (Math.random() * 5) - (Math.random() * 5);
		 	//Visible
		 	particles[k + 4] = 1;

		 	k += particleProps;

		 }

	}	

	function drawParticles(){
		
		var r = 0;

		while(r < particles.length){

			if(particles[r + 4] === 1){

				particles[r] += particles[r + 2];
				particles[r + 1] += particles[r + 3];

				particles[r + 2] = particles[r + 2] * 0.99;
				particles[r + 3] += 0.2;

				ctx.fillRect(particles[r], particles[r + 1], 3, 3);
			}

			r += particleProps;

		}

		// console.log(x);

	}

	function drawLogo(){
		ctx.drawImage(logo, cnvs.offsetWidth / 2 - 500, cnvs.offsetHeight / 2 - 150);
	}

	function drawSnowFlakes(){

		ctx.clearRect(0,0,cnvs.offsetWidth, cnvs.offsetHeight);

		drawParticles();
		drawLogo();

		var k = 0;

		while(k < snow.length){

			ctx.save();

			ctx.translate(snow[k], snow[k + 1]);
			ctx.rotate(snow[k + 2]);

			if(snow[k + 6] === 0){
				ctx.drawImage(flake, -flake.width / 2, -flake.height / 2);	
			
				if(snow[k + 1] > cnvs.offsetHeight / 4){

					if(Math.random() > 0.96	){
						snow[k + 6] = 1;

						pop(k / props);

					}

				}

			}

			ctx.restore();

			if(snow[k + 3] == 0){
				snow[k + 2] += 1;				
			} else {
				snow[k + 2] -= 1;
			}

			//snow[k + 2] += 1;
			// ctx.drawImage(flake, snow[k], snow[k + 1]);

			if(snow[k + 1] > cnvs.offsetHeight + 50 || snow[k] > cnvs.offsetWidth + 50){
				snow[k] = Math.random() * cnvs.offsetWidth - (Math.random() * cnvs.offsetWidth / 2) | 0;
				snow[k + 1] = 0 + -(Math.random() * cnvs.offsetHeight | 0);
				snow[k + 6] = 0;
			}

			snow[k + 1] += snow[k + 5];	
			snow[k] += snow[k + 4];

			k += props;

		}

		// ctx.fillRect(0,0,10,10);

		if(shouldDraw){
			window.requestAnimationFrame(drawSnowFlakes);
		}

	}

	function createSnowFlakes(number){
		//Quicker array access than traditional arrays;

		snow = new Int16Array(number * props);
		particles = new Float32Array(number * particleProps * wCount);

		for(var h = 0; h < number * props; h += props){
			//X
			snow[h] = Math.random() * cnvs.offsetWidth | 0;
			//Y
			snow[h + 1] = (Math.random() * cnvs.offsetHeight | 0) - (Math.random() * cnvs.offsetHeight | 0);
			//Rotation
			snow[h + 2] = Math.random() * 360 | 0;
			//Direcion
			snow[h + 3] = Math.round(Math.random());
			//VX
			snow[h + 4] = Math.random() * 4 + 1;
			//VY
			snow[h + 5] = Math.random() * 4 + 1;
			//Has exploded
			snow[h + 6] = 0;

		}

	}

	function testWhitePixels(){
		ctx.drawImage(flake, 0, 0);

		var d = ctx.getImageData(0,0,50,50);

		console.log(d);

		for(var h = 0; h < d.data.length; h += 4){

			if(red){
				if(d.data[h] === 255 && d.data[h + 1] === 0 && d.data[h + 2] === 0){
					wCount += 1;
				}	
			} else {
				if(d.data[h] === 255 && d.data[h + 1] === 255 && d.data[h + 2] === 255){
					wCount += 1;
				}
			}

			

		}

		// console.log(wCount);

	}

	function init(){
		console.log("Initialised");

		var w = new window_display();
	
		w.bind("f", "m");

		cnvs.width = cnvs.offsetWidth;
		cnvs.height = cnvs.offsetHeight;

		if(red){
			ctx.fillStyle = "rgb(255,0,0)";	
		} else {
			ctx.fillStyle = "rgb(255,255,255)";
		}
		

		logo.src = window.location.origin + "/stuff/snow/assets/images/redweb_medium.png";

		logo.onload = function(){
			
			if(red){
				flake.src = "/stuff/snow/assets/images/snowflake3.png";	
			} else {
				flake.src = "/stuff/snow/assets/images/snowflake2.png";
			}
			

			flake.onload = function(){
				console.log("We have the snow flake...");

				testWhitePixels();
				createSnowFlakes(snowCount);
				drawSnowFlakes();

			}
		
		}

		

		window.addEventListener('resize', function(){

			cnvs.width = cnvs.offsetWidth;
			cnvs.height = cnvs.offsetHeight;

			if(red){
				ctx.fillStyle = "rgb(255,0,0)";	
			} else {
				ctx.fillStyle = "rgb(255,255,255)";
			}

		}, true);

	}

	return{
		snow : init
	};

})();

(function(){
	__let_it.snow();
})();