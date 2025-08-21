// main.js 
import { Game } from '/src/Game.js';
/*
Overview:

-It starts by loading phyics engine. Then creates a Game object which handles all the levels and level changes.
-The SceneManager is the central class which handles all the graphics, physics, sound, cameras, rendering, and input. 
-Each level is a scene and loads all the models and creates physics objects for the 
-The PhysicsWorld is the where the simulation happens. Each physics object is fed to the SceneManager and updated every frame.
-The Model, Menu, and InputManager, AudioPlayer are helper classes.
*/


// Globals
globalThis._DEBUG = false;
globalThis._EDIT_MODE = false;
globalThis._PAUSED = false;	
globalThis._VEHICLE_SPEED = 0;
globalThis._SHADOWS = true;
globalThis._SHADOW_RES = 1024;
globalThis._SHOW_FPS = false;
globalThis.numPlayers = 1;

console.log("Launching Piper's Wild Ride");
console.log("===========================");

Ammo().then(function(Ammo) {
	console.log("Loaded Ammo");
    globalThis.Ammo = Ammo;
	globalThis.game = new Game();
});