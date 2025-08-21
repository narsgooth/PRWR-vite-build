import * as THREE from 'three';
import { Scene } from '/src/SceneManager.js';
import { Model } from '/src/Model.js';
import { PhysicsVehicle, PhysicsMesh, Star , PhysicsBall} from '/src/PhysicsWorld.js';

class IndoorSoccer extends Scene{
	load(){
		// Init
		this.flashText("Indoor Soccer");
		this.song = 'music/Bilar.ogg';
		console.log("Loading Indoor Soccer Level");
		
		// Lighting
		this.setSkyColor(0x000000);
		const ambientLight = new THREE.AmbientLight(0xffffff, .1);
		sceneManager.scene.add(ambientLight);
		
		const pointLight = new THREE.PointLight( 0xddFFFF, 2000, 2000,2);
		pointLight.shadow.mapSize.width = _SHADOW_RES;
		pointLight.shadow.mapSize.height = _SHADOW_RES;
		pointLight.shadow.bias = -0.00001; // or try -0.01
		pointLight.position.set( -20, 50, -5 );
		sceneManager.scene.add( pointLight );
		pointLight.castShadow = true;

		const pointLight2 = new THREE.PointLight( 0xddFFFF, 2000, 2000,2);
		pointLight2.shadow.mapSize.width = _SHADOW_RES;
		pointLight2.shadow.mapSize.height = _SHADOW_RES;
		pointLight2.shadow.bias = -0.00001; // or try -0.01
		pointLight2.position.set( 20, 50, 5 );
		sceneManager.scene.add( pointLight2 );
		pointLight2.castShadow = true;
		
		var color = 0x00ff00;
		var color2 = 0xff00ff;
		var color3 = 0xfffafa ;//0xff8800

		
		// Objects		
		var quarterPipe = new Model();
		quarterPipe.load('models/indoor soccer/stadium.glb', (loadedModel) => {
			
			quarterPipe.setColor(color);
			
			var shape = quarterPipe.createTriangleMeshShape();
			var mesh = quarterPipe.createConvexHullMesh();
			var stad1 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(0,0,0));
			stad1.addToWorld();
			quarterPipe.rotate(0,Math.PI,0);
			quarterPipe.setColor(color2);
			
			var stad2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(0,0,0));
			stad2.setRotation(0,Math.PI,0);
			stad2.addToWorld();
			
		});
		var soccerBall = new Model();
		soccerBall.load('models/indoor soccer/soccer ball.glb', (loadedModel) => {
			var shape = soccerBall.createConvexHullShape();
			var mesh = soccerBall.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,1,new THREE.Vector3(0,10,0));
			obj.addToWorld();		
			obj.rigidBody.setRestitution(1.5); // set bouncyness
	
		});
		/*
		var ball = new PhysicsBall(3,1,new THREE.Vector3(0,10,0)); 
		ball.setColor(color3);
		ball.rigidBody.setRestitution(1.5); // set bouncyness
		ball.addToWorld();
		*/
		
		var starModel = new Model();
		starModel.load('models/star.glb', (loadedModel) => {
			starModel.setColor(0xffff00);
			var star1 = new Star(loadedModel.clone(),new THREE.Vector3(0,2,110));
			star1.addToWorld();
			var star2 = new Star(loadedModel.clone(),new THREE.Vector3(0,2,-110));
			star2.addToWorld();
			var star3 = new Star(loadedModel.clone(),new THREE.Vector3(93,9,0));
			star3.addToWorld();
			var star4 = new Star(loadedModel.clone(),new THREE.Vector3(-93,9,0));
			star4.addToWorld();
		});
		
		var vehicle = new Model();
		vehicle.load('models/vehicles/jeep blue.glb', (loadedModel) => {
			var shape = vehicle.createConvexHullShape();
			var mesh = vehicle.createConvexHullMesh();
			var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(-10,10,15),0);	
				car.rotateVehicleY(Math.PI);		
		});
		if(numPlayers>1)
		{
			var vehicle2 = new Model();
			vehicle2.load('models/vehicles/jeep pink.glb', (loadedModel) => {
				var shape = vehicle2.createConvexHullShape();
				var mesh = vehicle2.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(10,10,-15),1);				
			});	
		}
		if(numPlayers>2){
			var vehicle3 = new Model();
			vehicle3.load('models/vehicles/jeep lime.glb', (loadedModel) => {
				var shape = vehicle3.createConvexHullShape();
				var mesh = vehicle3.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(-10,10,-15),2);
			});	
		}
		if(numPlayers>3){
			var vehicle4 = new Model();
			vehicle4.load('models/vehicles/jeep orange.glb', (loadedModel) => {
				var shape = vehicle4.createConvexHullShape();
				var mesh = vehicle4.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(10,10,15),3);
				car.rotateVehicleY(Math.PI);
			});	
		}
	}
}
export{ IndoorSoccer };