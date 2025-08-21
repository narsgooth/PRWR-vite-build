import * as THREE from 'three';
import { Scene } from '/src/SceneManager.js';
import { PhysicsVehicle, PhysicsMesh, PhysicsBox, Star } from '/src/PhysicsWorld.js';
import { Model } from '/src/Model.js';
class DesertCanyon extends Scene{
	load(){
		this.flashText("Desert Canyon");
		this.song = 'music/Desert Eagle.ogg';
		sceneManager.addDefaultLight();
		console.log("Loading Level 05");
		// Create a new THREE.Color object with a hexadecimal value
		
		this.setSkyColor(0x9696e6  );
		
		var color = 0xff77a6 ;

		// Set the clear color of the renderer
		
		// Create an exponential fog object
		//const fogColor = new THREE.Color(0x6d757d );
		//const density = 0.01; // Adjust this value to control the fog's intensity

		//sceneManager.scene.fog = new THREE.FogExp2(fogColor, density);
		
				
		var environment = new Model();
		environment.load('models/desert canyon/rock formation.glb', (loadedModel) => {
			environment.setColor(color);
			var shape = environment.createTriangleMeshShape();
			shape.setMargin(0.05); // slightly larger margin
			var mesh = environment.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(0,0,0));
			obj.addToWorld();
		});
		var terrain = new Model();
		terrain.load('models/desert canyon/terrain.glb', (loadedModel) => {
			terrain.setColor(color);
			var shape = terrain.createTriangleMeshShape();
			shape.setMargin(0.05); // slightly larger margin
			var mesh = terrain.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(0,0,0));
			obj.addToWorld();
		});
		
		var cactus = new Model();
		cactus.load('models/desert canyon/cactus.glb', (loadedModel) => {
			cactus.setColor(color);
			var shape = cactus.createConvexHullShape();
			var mesh = cactus.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(49,0,33));
			obj.addToWorld();
			var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(40,-.2,-45));
			obj2.addToWorld();
			var obj4 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-50,-.2,-40));
			obj4.addToWorld();
			var obj5 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-70,-.2,30));
			obj5.addToWorld();
			var obj6 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(60,-.2,-30));
			obj6.addToWorld();
			var obj7 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(29,0,50));
			obj7.addToWorld();
		});
		
		var vehicle = new Model();
		vehicle.load('models/vehicles/jeep blue.glb', (loadedModel) => {
			var shape = vehicle.createConvexHullShape();
			var mesh = vehicle.createConvexHullMesh();
			var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(0,10,-40),0);
		});
		if(numPlayers>1)
		{
			var vehicle2 = new Model();
			vehicle2.load('models/vehicles/jeep pink.glb', (loadedModel) => {
				var shape = vehicle2.createConvexHullShape();
				var mesh = vehicle2.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(10,10,-40),1);
			});	
		}
		if(numPlayers>2){
			var vehicle3 = new Model();
			vehicle3.load('models/vehicles/jeep lime.glb', (loadedModel) => {
				var shape = vehicle3.createConvexHullShape();
				var mesh = vehicle3.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(20,10,-40),2);
			});	
		}
		if(numPlayers>3){
			var vehicle4 = new Model();
			vehicle4.load('models/vehicles/jeep orange.glb', (loadedModel) => {
				var shape = vehicle4.createConvexHullShape();
				var mesh = vehicle4.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(30,10,-40),3);
			});	
		}
		var starModel = new Model();
		starModel.load('models/star.glb', (loadedModel) => {
			starModel.setColor(0xffff00);
			var star1 = new Star(loadedModel,new THREE.Vector3(-2,20,7));
			star1.addToWorld();
			var star2 = new Star(loadedModel,new THREE.Vector3(-1,17,41));
			star2.addToWorld();
			var star3 = new Star(loadedModel,new THREE.Vector3(0,18,-10));
			star3.addToWorld();
			var star4 = new Star(loadedModel,new THREE.Vector3(-19,21,-42));
			star4.addToWorld();
			var star5 = new Star(loadedModel,new THREE.Vector3(31,7,18));
			star5.addToWorld();
		});
	}
}
export{ DesertCanyon };