var window_display = (function(){

	function displayHelp(){

		console.log("To bind events for the window display you need to call the bind object on the constructer you've just created.");
		console.log("The bind object accepts two arguments, (fullScreen, showMask)."); 
		console.log("Pass through a single letter for each argument or pass undefined if you want to set one and not the other");
		console.log("When you type the key you passed for fullScreen, the browser will enter full screen mode");
		console.log("When you type the key you passed for showMask, it will toggle the mask at the bottom of the window");

	}

	function bindEvents(fullScreen, showMask){
		
		var mask = new Image();

		mask.style.display = "none";
		mask.style.position = "fixed";
		mask.style.bottom = 0;
		mask.style.left = "25px";
		mask.style.width = "96.5%";
		mask.style.height = "224px";
		mask.style.zIndex = 50000;
	
		document.body.style.cursor = "none"		

		mask.src = "http://windowstothesoul.redweb.com/windowmask.png";

		mask.onload = function(){
			document.body.appendChild(mask);
		}

		var fsKeycode = undefined,
			mKeycode = undefined;

		if(arguments.length > 0){

			if(fullScreen !== undefined){
				fsKeycode = fullScreen.charCodeAt(0);	
			}
			
			if(showMask !== undefined){
				mKeycode = showMask.charCodeAt(0);
			}
			
			window.addEventListener('keypress', function(key){

				if(key.charCode === fsKeycode){

					if (document.body.requestFullscreen) {
		 				 document.body.requestFullscreen();
					} else if (document.body.msRequestFullscreen) {
						 document.body.msRequestFullscreen();
					} else if (document.body.mozRequestFullScreen) {
		  				document.body.mozRequestFullScreen();
					} else if (document.body.webkitRequestFullscreen) {
		  				document.body.webkitRequestFullscreen();
					}
				
				} else if(key.charCode === mKeycode){
					if(mask.style.display === "none"){
						mask.style.display = "block";
					} else if(mask.style.display === "block"){
						mask.style.display = "none";
					}
				}

			}, false);

		}
		

	}

	return {
		bind : bindEvents,
		help : displayHelp
	};

});
