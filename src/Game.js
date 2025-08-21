// Game.js
/*
	Handles level changes and audio
*/
import { PhysicsWorld } from '/src/PhysicsWorld.js';
import { SceneManager } from '/src/SceneManager.js'; 
import { AudioPlayer } from '/src/AudioPlayer.js';
import { InputManager } from '/src/InputManager.js';
// Levels
import { LivingRoom } from '/src/Levels/Living Room.js';
import { IndoorSoccer } from '/src/Levels/Indoor Soccer.js';
import { SkateIsland } from '/src/Levels/Skate Island.js';
import { CrystalPark } from '/src/Levels/Crystal Park.js';
import { DesertCanyon } from '/src/Levels/Desert Canyon.js';
import { HousingDevelopment } from '/src/Levels/Housing Development.js';
import { TeaParty } from '/src/Levels/Tea Party.js';
import { WizardSchool } from '/src/Levels/Wizard School.js';
import { DominoSpace } from '/src/Levels/Domino Space.js';
import { MusicFestival } from '/src/Levels/Music Festival.js';

import { Credits } from '/src/Levels/Credits.js';

class Game{
	constructor(){
		// Init
		globalThis.physicsWorld = new PhysicsWorld();
		globalThis.world = physicsWorld.world;
		globalThis.sceneManager = new SceneManager();
		this.audioPlayer = new AudioPlayer();

		InputManager.init();
		// Levels
		this.levels = [							
						new LivingRoom(),	//0
						new CrystalPark(),	//1
						new IndoorSoccer(),	//2
						new SkateIsland(),	//3
						new DesertCanyon(),	//4
						new HousingDevelopment(),//5						
						new TeaParty(),		//6
						new WizardSchool(),	//7
						new DominoSpace(),	//8
						new MusicFestival(),	//9
						new Credits(),		//10

					];
		this.currentLevel = -1;
		this.loadLevel(0);
				
		// Start Drawing
		sceneManager.draw();
	}
	reload(){
		_PAUSED = false;
		this.loadLevel(this.currentLevel);
	}
	loadLevel(level){
		_PAUSED = false;
		if(this.currentLevel == 10)
		{
			sceneManager.removeSpedometer();
		}
		if(this.currentLevel != -1)
			this.levels[this.currentLevel].unload();
		this.levels[level].load();
		this.currentLevel = level;
		this.audioPlayer.loopSong(this.levels[level].song);
	}
	loadNextLevel(){
		_PAUSED = false;
		if(this.currentLevel == 10)
		{
			sceneManager.removeSpedometer();
		}
		if(this.currentLevel==this.levels.length-1)
			this.currentLevel=0;
		else {
			this.currentLevel++;
		}
		this.loadLevel(this.currentLevel);
		this.audioPlayer.loopSong(this.levels[this.currentLevel].song);
	}
}
export { Game };