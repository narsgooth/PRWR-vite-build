//Menu.js
class Menu {
    constructor() {
		this.overlay = this.addBackground();
		this.createTitle("textures/title card.png");
		this.loadMenu();
		this.mode = 1;
    }
	loadPause(){
		this.clearButtons();
		this.addButton("Reset", () => {
			this.hide();
            game.reload();
        });
		this.addButton("Quit", () => {
			sceneManager.removeSpedometer();
			numPlayers =1;
			this.mode = 1;
			this.loadMenu();
            game.loadLevel(0);
        });
	}
	loadMenu(){
		this.clearButtons();
        // Add buttons
        this.addButton("Start", () => {
            console.log("Game started!");
            this.hide();
			numPlayers = 1;
			this.loadPause();
            game.loadNextLevel();sceneManager.addSpedometer();
        });

        this.addButton("Multiplayer", () => {
            this.clearButtons();
			this.mode = 2; 
            this.addSelect(["2 player", "3 player", "4 player"], (value) => {
				if (value === "2 player")
					this.mode=2;
				else if(value === "3 player")
					this.mode=3;
				else if(value === "4 player")
					this.mode=4;
			});
			this.addButton("Start", () => {
				console.log(numPlayers);
				console.log("Game started!");
				this.hide();
				numPlayers = this.mode;
				this.loadPause();
				game.loadNextLevel();//sceneManager.addSpedometer();
			});
			this.addButton("Back", () => {
				this.clearButtons();
				this.loadMenu();
			});
        });
		
        this.addButton("Password", () => {
            console.log("Password clicked");
			this.clearButtons();
			
			const passwords = {
				"Crystal Park": 1,
				"Indoor Soccer": 2,
				"Skate Island": 3,
				"Desert Canyon": 4,
				"Housing Development": 5,
				"Tea Party": 6,
				"Wizard School": 7,
				"Domino Space": 8,
				"Music Festival": 9,
			};
			this.addPasswordInput(passwords, (level) => {
				console.log("Loading level:", level);
				this.hide();
				game.loadLevel(level);sceneManager.addSpedometer();
				this.loadPause();
			});
			this.addButton("Back", () => {
				this.clearButtons();				
				this.loadMenu();
			});
        });

        this.addButton("Options", () => {
            console.log("Options clicked");
            this.clearButtons();
			this.addSelect(["shadows on", "shadows off"], (value) => {
				if (value === "shadows off")
					_SHADOWS = false;
				else 
					_SHADOWS = true;
			});
			this.addSelect(["shadows low", "shadows med", "shadows high"], (value) => {
				if (value === "shadows high")
					_SHADOW_RES = 4096;
				else if (value === "shadows med")
					_SHADOW_RES = 2048;
				else
					_SHADOW_RES = 1024;
									
				console.log(_SHADOW_RES);
			});
			this.addSelect(["FPS off", "FPS on"], (value) => {
				if (value === "FPS off")
					sceneManager.showFPS(false);
				else 
					sceneManager.showFPS(true);
				
				console.log(_SHOW_FPS);
			});
			this.addButton("Back", () => {
				this.clearButtons();
				this.loadMenu();
			});
        });
		document.body.appendChild(this.overlay);
	}
	
    addBackground() {
        const overlay = document.createElement("div");
        overlay.id = "menu-overlay";
        Object.assign(overlay.style, {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            zIndex: "10",
            pointerEvents: "auto",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 0 30px rgba(0,0,0,0.7)",
            textAlign: "center"
        });
        return overlay;
    }

    createTitle(imgSrc) {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Menu";
        img.style.width = "100%";
        img.style.borderRadius = "10px";
        img.style.marginBottom = "10px";
        this.overlay.appendChild(img);
    }

    addButton(text, onClick) {
        const button = document.createElement("button");
        button.innerText = text;
        button.style.marginTop = "6px";
        button.onclick = onClick;
        this.overlay.appendChild(button);
    }

    addSelect(options, onChange) {
		const selectList = document.createElement("select");

		options.forEach(opt => {
			const option = document.createElement("option");
			option.value = opt;
			option.text = opt;
			selectList.appendChild(option);
		});

		// Handle selection changes
		selectList.addEventListener("change", () => {
			const selectedValue = selectList.value;
			console.log("Selected:", selectedValue);
			if (onChange) onChange(selectedValue);
		});

		this.overlay.appendChild(selectList);
	}
	addPasswordInput(passwordMap, onSubmit) {
		const input = document.createElement("input");
		input.type = "text";            // hides input text
		input.maxLength = 25;
		input.style.width = "160px";
		this.overlay.appendChild(input);

		// Create submit button
		const submitBtn = document.createElement("button");
		submitBtn.innerText = "Go";
		this.overlay.appendChild(submitBtn);

		submitBtn.onclick = () => {
			const entered = input.value.trim();
			if (passwordMap.hasOwnProperty(entered)) {
				onSubmit(passwordMap[entered]);
			}
			input.value = ""; // Clear input after submit
		};

		this.overlay.appendChild(submitBtn);
	}

    clearButtons() {
        // Keep the title image, remove everything else
        this.overlay.querySelectorAll("button, select, input").forEach(el => el.remove());
    }

    hide() {
        this.overlay.style.display = "none";
    }

    show() {
        this.overlay.style.display = "block";
    }

}

export { Menu };