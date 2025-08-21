import * as THREE from 'three';
import { Scene } from '/src/SceneManager.js';
import { PhysicsVehicle, PhysicsMesh, PhysicsCube, PhysicsBox, Star } from '/src/PhysicsWorld.js';
import { Model } from '/src/Model.js';

class SkateIsland extends Scene{
	load(){
		// Init
		this.song = 'music/Mandy.ogg';
		console.log("Loading Skate Island Level");
		this.flashText("Skate Island");
		// Lighting
		sceneManager.addDefaultLight();
		sceneManager.dirLight.position.set(20, 100, 0);
		sceneManager.dirLight.target.position.set(0, 0, 0);
		this.setSkyColor(0xf84a8a );		
		var color = 0xff8100    ;
		var color2 = 0x00ff00 ;
		
		//Objects		
		var islandHeight = -18;		
		var island = new Model();
		island.load('models/skate island/island.glb', (loadedModel) => {
			
			var shape = island.createTriangleMeshShape();
			var mesh = island.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(0,islandHeight,0));
			obj.addToWorld();
			island.setColor(color);
		});
		
		var palmTree = new Model();
		palmTree.load('models/skate island/palm tree.glb', (loadedModel) => {
			palmTree.setColor(color);			
			var shape = palmTree.createTriangleMeshShape();
			var mesh = palmTree.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(59,0,-19));
			obj.addToWorld();
			var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-41,-12,-44));
			obj2.addToWorld();
			var obj3 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(155,-14,-124));
			obj3.addToWorld();
			var obj4 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(142,-12,-134));
			obj4.addToWorld();
			
		});
		
		var floor = new PhysicsCube(40,0,new THREE.Vector3(0,-20,40));
		floor.setColor(color);
		floor.addToWorld();
		
		var floor = new PhysicsCube(40,0,new THREE.Vector3(40,-24,40));
		floor.setColor(color);
		floor.addToWorld();
		
		var floor = new PhysicsCube(40,0,new THREE.Vector3(40,-20,0));
		floor.setColor(color);
		floor.addToWorld();
		var bowl = new Model();
		bowl.load('models/skate island/bowl.glb', (loadedModel) => {
			
			var shape = bowl.createTriangleMeshShape();
			var mesh = bowl.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(0,0,0));
			obj.addToWorld();
			bowl.setColor(color);
		});
		
		var quarterPipe = new Model();
		quarterPipe.load('models/skate island/quarter pipe.glb', (loadedModel) => {
			quarterPipe.setColor(color);			
			var shape = quarterPipe.createTriangleMeshShape();
			var mesh = quarterPipe.createConvexHullMesh();
			
			var obj1 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(10,0,40));
			obj1.addToWorld();
			
			var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-10,0,40));
			obj2.setRotation(0,Math.PI,0);
			obj2.addToWorld();
		});
		var halfPyramid = new Model();
		halfPyramid.load('models/skate island/half pryamid.glb', (loadedModel) => {
			
			var shape = halfPyramid.createConvexHullShape();
			var mesh = halfPyramid.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(40,0,0));
			obj.addToWorld();
			halfPyramid.setColor(color);
		});
		var stairs = new Model();
		stairs.load('models/skate island/stairs.glb', (loadedModel) => {
			stairs.setColor(color);
			var shape = stairs.createTriangleMeshShape();
			var mesh = stairs.createConvexHullMesh();
			
			var obj5 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(43,-4,43));
			obj5.setRotation(0,-Math.PI/2,0);
			obj5.addToWorld();
			var obj6 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(43,-4,37));
			obj6.setRotation(0,-Math.PI/2,0);
			obj6.addToWorld();
		});
		
		
		var wall = new Model();
		wall.load('models/skate island/wall.glb', (loadedModel) => {
			wall.setColor(color);
			var shape = wall.createConvexHullShape();
			var mesh = wall.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(41,-4,40));
			obj.setRotation(0,Math.PI/2,0);
			obj.addToWorld();
		});
		var ramp = new Model();
		ramp.load('models/crystal park/ramp.glb', (loadedModel) => {
			ramp.setColor(color);
			var shape = ramp.createConvexHullShape();
			var mesh = ramp.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(39,-4,43));
			obj.setRotation(0,Math.PI/2,0);
			obj.addToWorld();
			var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(39,-4,37));
			obj2.setRotation(0,Math.PI/2,0);
			obj2.addToWorld();
			
			
			var obj3 = new PhysicsBox(15,.1,4,0,new THREE.Vector3(52,-1.8,26));
			obj3.setColor(color);
			obj3.setRotation(0,Math.PI/2,Math.PI/11);
			obj3.addToWorld();
			
			var obj4 = new PhysicsBox(16.5,.1,4,0,new THREE.Vector3(52,-6.2,67.5));
			obj4.setColor(color);
			obj4.setRotation(0,Math.PI/2,Math.PI/11);
			obj4.addToWorld();
		});
		
		var waterGeometry = new THREE.BoxGeometry(400, 1, 400);
		var waterMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color().setHex(color2) });
		var mesh = new THREE.Mesh(waterGeometry, waterMaterial);
		mesh.position.y=islandHeight;
		sceneManager.scene.add(mesh);
		
		var waterFloor = new PhysicsCube(400,0,new THREE.Vector3(0,-200+islandHeight-1,0));
		waterFloor.setColor(color);
		waterFloor.addToWorld();
		
		var starModel = new Model();
		starModel.load('models/star.glb', (loadedModel) => {
			starModel.setColor(0xffff00);
			var star1 = new Star(loadedModel,new THREE.Vector3(-9,6,40));
			star1.addToWorld();
			
			var star3 = new Star(loadedModel,new THREE.Vector3(9,6,40));
			star3.addToWorld();
			
			var star2 = new Star(loadedModel,new THREE.Vector3(40,4,0));
			star2.addToWorld();
			var star4 = new Star(loadedModel,new THREE.Vector3(41,-1,37));
			star4.addToWorld();
			var star5 = new Star(loadedModel,new THREE.Vector3(41,-1,43));
			star5.addToWorld();
			var star6 = new Star(loadedModel,new THREE.Vector3(-10,0,-1));
			star6.addToWorld();
		});
		
		var vehicle = new Model();
		vehicle.load('models/vehicles/jeep blue.glb', (loadedModel) => {
			var shape = vehicle.createConvexHullShape();
			var mesh = vehicle.createConvexHullMesh();
			var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(-10,2,15),0);
			car.rotateVehicleY(Math.PI);
		});
		if(numPlayers>1)
		{
			var vehicle2 = new Model();
			vehicle2.load('models/vehicles/jeep pink.glb', (loadedModel) => {
				var shape = vehicle2.createConvexHullShape();
				var mesh = vehicle2.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(10,2,-15),1);
			});
		}
		if(numPlayers>2){
			var vehicle3 = new Model();
			vehicle3.load('models/vehicles/jeep lime.glb', (loadedModel) => {
				var shape = vehicle3.createConvexHullShape();
				var mesh = vehicle3.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(-10,2,-15),2);
			});	
		}
		if(numPlayers>3){
			var vehicle4 = new Model();
			vehicle4.load('models/vehicles/jeep orange.glb', (loadedModel) => {
				var shape = vehicle4.createConvexHullShape();
				var mesh = vehicle4.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(10,2,15),3);
				car.rotateVehicleY(Math.PI);
			});	
		}
	}
}
export{ SkateIsland };