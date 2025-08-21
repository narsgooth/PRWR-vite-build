//SceneManager.js
import * as THREE from 'three';
import { InputManager } from '/src/InputManager.js';
import { Menu } from '/src/Menu.js';
//Debug
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';//Debug

globalThis._EDITOR_POSITION = new THREE.Vector3(0,0,0);
globalThis._CURRENT_OBJECT = 0;

class SceneManager{
	constructor(){
		console.log("Initializing Graphics");
		// Graphics/Physics
		this.numStars = 0;
		this.objects = [];

		// Graphics
		this.scene = new THREE.Scene();
		
		// Cameras
		this.camera = [];
		for(var i = 0; i < numPlayers; i++)
			this.camera[i] = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
		this.camera[0].position.z = 6;
		this.camera[0].position.y = 2;
		this.camera[0].position.y = 0;		
		
		// Renderer
		this.renderer = new THREE.WebGLRenderer({ antialias: false ,alpha: false});		
		this.renderer.shadowMap.enabled = true;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.autoClear = false
		
		
			
		document.body.appendChild(this.renderer.domElement);
		
		window.addEventListener('resize', () => {
			// Update perspective cameras
			for (let i = 0; i < this.camera.length; i++) {
				this.camera[i].aspect = window.innerWidth / window.innerHeight;
				this.camera[i].updateProjectionMatrix();
			}

			// Update HUD orthographic camera
			const aspect = window.innerWidth / window.innerHeight;
			const viewSize = 10;
			const hh = viewSize / 2;
			const ww = hh * aspect;
			this.hudCamera.left = -ww;
			this.hudCamera.right = ww;
			this.hudCamera.top = hh;
			this.hudCamera.bottom = -hh;
			this.hudCamera.updateProjectionMatrix();

			// Update renderer
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.hudSprite.position.set(ww-2,-3.5);
			this.needle.position.set(ww-2,-3.5);
		});
		
		// Time
		this.time = 0;
		this.clock = new THREE.Clock();
		this.menu = new Menu();
		
		// Debug and Editor
		this.stats = new Stats();

		this.axesHelper = new THREE.AxesHelper(100);
		this.axes2Helper = new THREE.AxesHelper(100);
		
		this.editorPosition = new THREE.Vector3(0,0,0);
				
		this.orbigControls= new OrbitControls(this.camera[0], this.renderer.domElement);
		this.orbigControls.enableDamping = true; // optional smooth motion
		this.orbigControls.autoRotate = false;
		this.orbigControls.dampingFactor = 0.05;
		
		
		if(_DEBUG)
		{	
			this.scene.add(this.axesHelper);
			// Editor
			this.scene.add(this.axes2Helper);
		}
		// Input
		this.prevActions = {};
		
		// Speedometer
		this.needle = null;
		this.hudSprite = null;
		this.hudScene = new THREE.Scene();
		const aspect = window.innerWidth / window.innerHeight;
		const viewSize = 10; // how much "height" you want visible

		const hh = viewSize / 2;        // half height
		const ww = hh * aspect;         // half width based on aspect ratio
		this.hudCamera = new THREE.OrthographicCamera(-ww, ww, hh, -hh, 0, 10);
		
	}
	draw(){
		InputManager.pollMultiGamepads();
		if(InputManager.actions[0].esc && !this.prevActions.esc){
			_PAUSED = !_PAUSED;
			if(_PAUSED)
				this.menu.show();
			else
				this.menu.hide();
		}
		if(this.needle){
			this.needle.material.rotation = -(_VEHICLE_SPEED/40*3/2-Math.PI/1.335);
			//console.log(_VEHICLE_SPEED);
		}
		this.stats.begin();
		var dt = this.clock.getDelta();
		if (InputManager.actions[0].skip && !this.prevActions.skip && _DEBUG) {
			game.loadNextLevel();
		}
		
		if(!_EDIT_MODE )
		{
			this.objects.forEach(physicsObject => {
				physicsObject.synchronize(false);
			});
			if(!_PAUSED)
			{
				physicsWorld.run( dt );
				this.time += dt;
			}
		}
		else
		{			
			this.editObject(_CURRENT_OBJECT);
			this.orbigControls.update( dt );//Debug
		}
		if(InputManager.actions[0].editMode && ! this.prevActions.editMode)
			_EDIT_MODE=!_EDIT_MODE;
		if(InputManager.actions[0].debug && ! this.prevActions.debug)
			_DEBUG=!_DEBUG;
		if(numPlayers==4)
		{
			this.renderer.setScissorTest(true);
			var w = window.innerWidth / 2;
			var h = window.innerHeight / 2;

			for (let i = 0; i < 4; i++) {
				var x = (i % 2) * w;
				var y = i < 2 ? h : 0; // top row: y = h, bottom: y = 0

				this.renderer.setViewport(x, y, w, h);
				this.renderer.setScissor(x, y, w, h);
				this.renderer.clear();
				this.renderer.clearDepth();
				this.renderer.render(this.scene, this.camera[i]);
			}
		}
		else if(numPlayers==2 || numPlayers==3)
		{
			this.renderer.setScissorTest(true);
			var w = window.innerWidth / numPlayers;
			var h = window.innerHeight ;

			for (let i = 0; i < numPlayers; i++) {
				var x = (i % numPlayers) * w;
				var y = 0; // top row: y = h, bottom: y = 0
				
				this.camera[i].aspect = w / h;
				this.camera[i].updateProjectionMatrix();

				this.renderer.setViewport(x, y, w, h);
				this.renderer.setScissor(x, y, w, h);
				this.renderer.clear();
				this.renderer.clearDepth();
				this.renderer.render(this.scene, this.camera[i]);
				
			}
		}
		else //if players ==1 
		{
			this.renderer.setScissorTest(false);
			var w = window.innerWidth ;
			var h = window.innerHeight ;
			this.camera[0].aspect = w / h;
			this.camera[0].updateProjectionMatrix();

			this.renderer.setViewport(0, 0, w, h);
			this.renderer.setScissor(0, 0, w, h);
			
			this.renderer.clear();
			this.renderer.render(this.scene, this.camera[0]);
		    // Render HUD
			this.renderer.clearDepth(); // allow HUD to draw over scene
		}
		this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
		this.renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
		this.renderer.setScissorTest(false);
		this.renderer.render(this.hudScene, this.hudCamera);
		requestAnimationFrame(() => this.draw());

		this.stats.end();
		this.prevActions = Object.assign({}, InputManager.actions[0]);
	}
	resetScene(){
		this.scene = new THREE.Scene();
		for(var i =0; i < numPlayers; i++)
			this.camera[i] = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
		this.orbigControls= new OrbitControls(this.camera[0], this.renderer.domElement);
		if(_DEBUG){
			this.scene.add(this.axes2Helper);		
			this.scene.add(this.axesHelper);
		}
	}
	addDefaultLight(){
		// Ambient Light
		this.ambientLight = new THREE.AmbientLight(0xffffff, .5);
		this.scene.add(this.ambientLight);
		// Directional Light
		this.dirLight = new THREE.DirectionalLight(0xffffff, 2);
		this.dirLight.position.set(20, 30, 10);
		this.dirLight.target.position.set(0, 10, 0);
		if(_SHADOWS){
			this.dirLight.castShadow = true;
			this.dirLight.shadow.bias = -.0001;
			this.dirLight.shadow.mapSize.width = _SHADOW_RES;
			this.dirLight.shadow.mapSize.height = _SHADOW_RES;
			this.dirLight.shadow.camera.near = .1;
			this.dirLight.shadow.camera.far = 500.0;
			this.dirLight.shadow.camera.left = -100;
			this.dirLight.shadow.camera.right = 100;
			this.dirLight.shadow.camera.top = 100;
			this.dirLight.shadow.camera.bottom = -100;
		}
		this.scene.add(this.dirLight);
	}
	addSpedometer(){
		const aspect = window.innerWidth / window.innerHeight;
		const viewSize = 10; // how much "height" you want visible
		const hh = viewSize / 2;        // half height
		const ww = hh * aspect;         // half width based on aspect ratio
		
		// Load HUD texture
		new THREE.TextureLoader().load('textures/speedometer background.png', (texture) => {
			const hudMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.5});
			this.hudSprite = new THREE.Sprite(hudMaterial);
			this.hudSprite.scale.set(2, 2, 1); // size in screen space
			this.hudSprite.position.set(ww-2,-3.5);
			this.hudScene.add(this.hudSprite); // center of screen
		});
		new THREE.TextureLoader().load('textures/speedometer needle.png', (texture) => {
			const hudMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
			this.needle = new THREE.Sprite(hudMaterial);
			this.needle.scale.set(2, 2, 1); // size in screen space
			this.needle.position.set(ww-2,-3.5)
			this.hudScene.add(this.needle); // center of screen
		});
	}
	removeSpedometer(){
		this.hudScene.clear();
	}
	editObject(current){
		// Editor		
		var d = 1;
		var obj = this.objects[current];
		
		if (InputManager.actions[0].moveForward && !this.prevActions.moveForward) {
			_EDITOR_POSITION.z += d;
			obj.setPosition(_EDITOR_POSITION.x,_EDITOR_POSITION.y,_EDITOR_POSITION.z);
			obj.synchronize(true);
		}
		else if (InputManager.actions[0].moveBack && !this.prevActions.moveBack) {
			_EDITOR_POSITION.z -= d;
			obj.setPosition(_EDITOR_POSITION.x,_EDITOR_POSITION.y,_EDITOR_POSITION.z);
			obj.synchronize(true);
		}
		else if (InputManager.actions[0].moveLeft && !this.prevActions.moveLeft) {
			_EDITOR_POSITION.x -= d;
			obj.setPosition(_EDITOR_POSITION.x,_EDITOR_POSITION.y,_EDITOR_POSITION.z);
			obj.synchronize(true);
		}
		else if (InputManager.actions[0].moveRight && !this.prevActions.moveRight) {
			_EDITOR_POSITION.x += d;
			obj.setPosition(_EDITOR_POSITION.x,_EDITOR_POSITION.y,_EDITOR_POSITION.z);
			obj.synchronize(true);
		}
		else if (InputManager.actions[0].moveUp && !this.prevActions.moveUp) {
			_EDITOR_POSITION.y -= d;
			obj.setPosition(_EDITOR_POSITION.x,_EDITOR_POSITION.y,_EDITOR_POSITION.z);
			obj.synchronize(true);
		}
		else if (InputManager.actions[0].moveDown && !this.prevActions.moveDown) {
			_EDITOR_POSITION.y += d;
			obj.setPosition(_EDITOR_POSITION.x,_EDITOR_POSITION.y,_EDITOR_POSITION.z);
			obj.synchronize(true);
		}
		else if (InputManager.actions[0].print && !this.prevActions.print) {
			console.log("e:"+_EDITOR_POSITION.x+","+_EDITOR_POSITION.y+","+_EDITOR_POSITION.z)
		}
		else if (InputManager.actions[0].next && !this.prevActions.next) {
			_CURRENT_OBJECT ++;
			if(_CURRENT_OBJECT >= this.objects.length)
				_CURRENT_OBJECT = 0;
			
			console.log(_CURRENT_OBJECT);
			this.axes2Helper.position.copy(this.objects[_CURRENT_OBJECT].pos);
			
			_EDITOR_POSITION.x=0;
			_EDITOR_POSITION.y=0;
			_EDITOR_POSITION.z=0;
		}
	}
	showFPS(bool)
	{
		if(bool){
			this.stats.showPanel(0); // 0 = FPS, 1 = MS, 2 = MB
			document.body.appendChild(this.stats.dom);
		}
		else
		{
			document.body.removeChild(this.stats.dom);
		}
	}
}
class Scene {
	constructor(){
	}
	load(){
		throw new Error('Method "load()" must be implemented');
	}
	unload(){
		console.log('Unloading Scene');
		sceneManager.objects.forEach(physicsObject => {
			physicsObject.removeFromWorld();
		});
		sceneManager.objects = [];
		sceneManager.resetScene();
		sceneManager.numStars=0;
	}
	setSkyColor(color){
		// Set the clear color of the renderer
		sceneManager.renderer.setClearColor(new THREE.Color(color));
		
	}
	flashText(text) {
		const canvas = document.createElement('canvas');
		canvas.width = 512;  // fixed size, or you can set dynamically
		canvas.height = 128;

		const ctx = canvas.getContext('2d');
		ctx.font = '38px Arial';
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		// Center position is half of canvas width/height
		ctx.fillText(text, canvas.width / 2, canvas.height / 2);

		const texture = new THREE.CanvasTexture(canvas);
		const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
		const sprite = new THREE.Sprite(material);
		sprite.scale.set(9, 2.5, 1); // adjust as needed

		// Center sprite in HUD scene
		sprite.position.set(0, 0, 0);

		sceneManager.hudScene.add(sprite);

		setTimeout(() => {
			sceneManager.hudScene.remove(sprite);
			sprite.material.map.dispose();
			sprite.material.dispose();
		}, 2000);
	}	
}
export { SceneManager, Scene };