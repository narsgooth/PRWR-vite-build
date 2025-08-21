// InputManager.js
/*
	Static class that handles keyboard input or up to four gamepads
*/

class InputManager{
	static actions = [{},{},{},{}];
	static keysActions = {
		// Car Controls
		"KeyW":'acceleration',
		"KeyS":'braking',
		"KeyA":'left',
		"KeyD":'right',
		"KeyR":'reset',
		"Escape":'esc',
		
		// Flying/Editor
		"ArrowUp":'moveForward',
		"ArrowDown":'moveBack',
		"ArrowLeft":'moveLeft',
		"ArrowRight":'moveRight',
		
		// Editor Controls
		"F2":'editMode',
		"KeyP":'print',
		"KeyO":'debug',
		"Enter":'next',
		"KeyN":'skip',
		"NumpadSubtract":'moveDown',
		"NumpadAdd":'moveUp',
	};
	constructor(){
		throw new Error("This class cannot be instantiated");
	}
	// Must be Initialiazed
	static init() {
		window.addEventListener( 'keydown', this.keydown.bind(this));
		window.addEventListener( 'keyup', this.keyup.bind(this));		
	}	
	static keyup(e) {
		if (game.currentLevel==0) return;
		if(this.keysActions[e.code]) {
			this.actions[0][this.keysActions[e.code]] = false;
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	}
	static keydown(e) {
		if (game.currentLevel==0) return;
		if(this.keysActions[e.code]) {
			this.actions[0][this.keysActions[e.code]] = true;
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	}

	static pollMultiGamepads() {
		
		const gamepadActions = {
			0: 'reset',  // A
			1: 'skip',  // B
			2: '',  // X
			3: '',  // Y
			4: '',  // LB
			5: '',  // RB
			6: 'braking',  // LT (analog handled separately if needed)
			7: 'acceleration',  // RT
			8: '',  // Select / View
			9: 'esc',  // Start / Menu
			12: '',	// D-pad Up
			13: '', // D-pad Down
			14: '', // D-pad Left
			15: ''  // D-pad Right
		};
		// Analog stick mapping (axes)
		const stickThreshold = 0.2; // deadzone
		
		const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
		var playerId = 0;
		for (let gp of gamepads) {
			if (!gp) continue;
			var reversePlayerId = numPlayers-playerId-1;// Populate Backwards for maximum players
			//playerId++;
			// Handle buttons
			gp.buttons.forEach((btn, index) => {
				const action = gamepadActions[index];
				if (action) {
					this.actions[reversePlayerId][action] = btn.pressed;
				}
			});
			// Handle left stick for forward/back/left/right
			const lx = gp.axes[0];
			const ly = gp.axes[1];
			
			const rx = gp.axes[2];
			const ry = gp.axes[3];

			this.actions[reversePlayerId]['left']        = lx < -stickThreshold;
			this.actions[reversePlayerId]['right']       = lx >  stickThreshold;
			
			this.actions[reversePlayerId]['down']        = ly < -stickThreshold;
			this.actions[reversePlayerId]['up']       = ly >  stickThreshold;
			if(game.currentLevel == 7){
				this.actions[reversePlayerId]['moveLeft']        = rx < -stickThreshold;
				this.actions[reversePlayerId]['moveRight']       = rx >  stickThreshold;
			}
			if(playerId > numPlayers)
				playerId =0;
		}
	}
}

export { InputManager };