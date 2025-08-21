import * as THREE from 'three';
import { Scene } from '/src/SceneManager.js';
import { Model } from '/src/Model.js';
import { PhysicsVehicle, PhysicsMesh, PhysicsCube, PhysicsBox, Star } from '/src/PhysicsWorld.js';

class CrystalPark extends Scene{
	load(){		
		// Init
		console.log("Loading Crystal Park Level");
		this.song = 'music/Breaking Away.ogg';
		this.flashText("Crystal Park");

		// Lighting
		sceneManager.addDefaultLight();
		this.setSkyColor(0x00e0ff);
		var color = 0xc682e5;
		
		// Objects		
		var ramp = new Model();
		ramp.load('models/crystal park/ramp.glb', (loadedModel) => {
			ramp.setColor(color);
			var shape = ramp.createConvexHullShape();
			var mesh = ramp.createConvexHullMesh();
			
			// Grid 
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-24,0,32));
			obj.addToWorld();
			var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-24,0,40));
			obj2.addToWorld();
			var obj7 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-24,0,24));
			obj7.addToWorld();
			var obj3 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-32,0,32));
			obj3.addToWorld();
			var obj4 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-32,0,40));
			obj4.addToWorld();
			var obj8 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-24,0,24));
			obj8.addToWorld();
			var obj5 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-38,0,32));
			obj5.addToWorld();
			var obj6 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-38,0,40));
			obj6.addToWorld();
			
			// Up Down
			var obj7 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(4,0,-34));
			obj7.setRotation(0,Math.PI/2,0);
			obj7.addToWorld();
			var obj8 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(8,0,-34));
			obj8.setRotation(0,-Math.PI/2,0);
			obj8.addToWorld();			
			var obj9 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(12,0,-34));
			obj9.setRotation(0,Math.PI/2,0);
			obj9.addToWorld();
			var obj10 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(16,0,-34));
			obj10.setRotation(0,-Math.PI/2,0);
			obj10.addToWorld();			
			var obj11 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(0,0,-34));
			obj11.setRotation(0,-Math.PI/2,0);
			obj11.addToWorld();
			var obj12 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-4,0,-34));
			obj12.setRotation(0,Math.PI/2,0);
			obj12.addToWorld();
			var obj13 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-8,0,-34));
			obj13.setRotation(0,-Math.PI/2,0);
			obj13.addToWorld();
			var obj14 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-12,0,-34));
			obj14.setRotation(0,Math.PI/2,0);
			obj14.addToWorld();
			
			// Up Up Up Up
			var obj15 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-12,0,-42));
			obj15.setRotation(0,Math.PI/2,0);
			obj15.addToWorld();
			var obj16 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-4,0,-42));
			obj16.setRotation(0,Math.PI/2,0);
			obj16.addToWorld();
			var obj17 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(4,0,-42));
			obj17.setRotation(0,Math.PI/2,0);
			obj17.addToWorld();
			var obj18 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(12,0,-42));
			obj18.setRotation(0,Math.PI/2,0);
			obj18.addToWorld();
			
			// Saw
			var obj19 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-12,0,-50));
			obj19.setRotation(0,Math.PI/2,0);
			obj19.addToWorld();
			var obj20 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-8,0,-50));
			obj20.setRotation(0,Math.PI/2,0);
			obj20.addToWorld();
			var obj21 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-4,0,-50));
			obj21.setRotation(0,Math.PI/2,0);
			obj21.addToWorld();
			var obj22 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(0,0,-50));
			obj22.setRotation(0,Math.PI/2,0);
			obj22.addToWorld();
			var obj23 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(4,0,-50));
			obj23.setRotation(0,Math.PI/2,0);
			obj23.addToWorld();
			var obj24 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(8,0,-50));
			obj24.setRotation(0,Math.PI/2,0);
			obj24.addToWorld();
			var obj25 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(12,0,-50));
			obj25.setRotation(0,Math.PI/2,0);
			obj25.addToWorld();
			var obj26 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(16,0,-50));
			obj26.setRotation(0,Math.PI/2,0);
			obj26.addToWorld();
		});
		var ramp2 = new Model();
		ramp.load('models/crystal park/ramp 2nd.glb', (loadedModel) => {
			ramp.setColor(color);
			var shape = ramp.createConvexHullShape();
			var mesh = ramp.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(18,0,26));
			obj.addToWorld();
			var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-28,0,62));
			obj2.setRotation(0,Math.PI/2,0);
			obj2.addToWorld();
			var obj3 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-28,0,73));
			obj3.setRotation(0,Math.PI/2,0);
			obj3.addToWorld();
			
			// Facing Ramps
			var obj4 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-56,0,-6));
			obj4.setRotation(0,0,0);
			obj4.addToWorld();
			var obj5 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-56,0,6));
			obj5.setRotation(0,-Math.PI,0);
			obj5.addToWorld();
		});
		
		var crystals = new Model();
		crystals.load('models/crystal park/crystals.glb', (loadedModel) => {
			
			var shape = crystals.createTriangleMeshShape();
			var mesh = crystals.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(-70,0,70));
			obj.addToWorld();
			crystals.setColor(color);
		});
		
		var crystals2nd = new Model();
		crystals2nd.load('models/crystal park/crystals 2nd.glb', (loadedModel) => {
			crystals2nd.setColor(color);			
			var shape = crystals2nd.createTriangleMeshShape();
			var mesh = crystals2nd.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(70,0,-70));
			obj.setRotation(0,Math.PI/3,0);
			obj.addToWorld();
		});
		var floor = new PhysicsCube(200,0,new THREE.Vector3(0,-100,0));
		floor.setColor(color);
		floor.addToWorld();
		
		
		var rect = new PhysicsBox(32,2,4,0,new THREE.Vector3(0,1,62));
		rect.setColor(color);
		rect.addToWorld();
		
		
		var rect2 = new PhysicsBox(32,2,4,0,new THREE.Vector3(18,1,48));
		rect2.setRotation(0,Math.PI/2,0);
		rect2.setColor(color);
		rect2.addToWorld();
		
		
		var rect3 = new PhysicsBox(32,2,4,0,new THREE.Vector3(4,1,73));
		rect3.setColor(color);
		rect3.addToWorld();
		
		var starModel = new Model();
		starModel.load('models/star.glb', (loadedModel) => {
			starModel.setColor(0xffff00);
			
			var star2 = new Star(loadedModel,new THREE.Vector3(-56,5,0));
			star2.addToWorld();
			var star3 = new Star(loadedModel,new THREE.Vector3(-32,3,42));
			star3.addToWorld();
			var star5 = new Star(loadedModel,new THREE.Vector3(-10,3,-34));
			star5.addToWorld();
			var star6 = new Star(loadedModel,new THREE.Vector3(-2,3,-34));
			star6.addToWorld();
			var star7 = new Star(loadedModel,new THREE.Vector3(6,3,-34));
			star7.addToWorld();
			var star8 = new Star(loadedModel,new THREE.Vector3(14,3,-34));
			star8.addToWorld();
			var star9 = new Star(loadedModel,new THREE.Vector3(18,4,48));
			star9.addToWorld();
			var star10 = new Star(loadedModel,new THREE.Vector3(1,4,62));
			star10.addToWorld();
		});
		
		var vehicle = new Model();
		vehicle.load('models/vehicles/jeep blue.glb', (loadedModel) => {
			var shape = vehicle.createConvexHullShape();
			var mesh = vehicle.createConvexHullMesh();
			var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(0,10,0),0);			
		});
		if(numPlayers>1)
		{
			var vehicle2 = new Model();
			vehicle2.load('models/vehicles/jeep pink.glb', (loadedModel) => {
				var shape = vehicle2.createConvexHullShape();
				var mesh = vehicle2.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(10,10,0),1);				
			});	
		}
		if(numPlayers>2){
			var vehicle3 = new Model();
			vehicle3.load('models/vehicles/jeep lime.glb', (loadedModel) => {
				var shape = vehicle3.createConvexHullShape();
				var mesh = vehicle3.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(20,10,0),2);				
			});	
		}
		if(numPlayers>3){
			var vehicle4 = new Model();
			vehicle4.load('models/vehicles/jeep orange.glb', (loadedModel) => {
				var shape = vehicle4.createConvexHullShape();
				var mesh = vehicle4.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(30,10,0),3);				
			});	
		}
	}
}
export{ CrystalPark };