import * as THREE from 'three';
import { Scene } from '/src/SceneManager.js';
import { PhysicsVehicle, PhysicsMesh, PhysicsCube, Star } from '/src/PhysicsWorld.js';
import { Model } from '/src/Model.js';
class MusicFestival extends Scene{
	load(){
		// Init
		console.log("Loading Music Festival Level");
		this.song = 'music/Wildcat.ogg';
		this.flashText("Music Festival");
		
		// Lighting
		sceneManager.addDefaultLight();
		this.setSkyColor(0x000000);
		var color = 0x4b0082  ;
				
		// Objects
		var floor = new PhysicsCube(200,0,new THREE.Vector3(0,-100,0));
		floor.setColor(color);
		floor.addToWorld();
		
		var entrance = new Model();
		entrance.load('models/music festival/entrance.glb', (loadedModel) => {
			entrance.setColor(color);
			var shape = entrance.createTriangleMeshShape();
			var mesh = entrance.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(0,0,0));
			obj.addToWorld();
		});
		
		var tent = new Model();
		tent.load('models/music festival/tent.glb', (loadedModel) => {
			tent.setColor(color);
			var shape = tent.createConvexHullShape();
			var mesh = tent.createConvexHullMesh();
			for(var j = 0 ; j < 5;j++){
				for(var i = 0 ; i < 10;i++){
					var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,.1,new THREE.Vector3(10+(i-5)*10,1,20+j*10));
					obj.addToWorld();
				}
			}
		});
		var fence = new Model();
		fence.load('models/housing development/fence.glb', (loadedModel) => {
			fence.setColor(color);
			var shape = fence.createConvexHullShape();
			var mesh = fence.createConvexHullMesh();
			
			
			for(var i = 0 ; i < 16;i++){
				var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-(i*6+10),1.28,0));
				obj.rigidBody.setFriction(1); 
				obj.setRotation(0,-Math.PI/2,Math.PI);
				obj.addToWorld();
				
				var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3((i*6+10),1.28,0));
				obj2.rigidBody.setFriction(1); 
				obj2.setRotation(0,-Math.PI/2,Math.PI);
				obj2.addToWorld();
			}
		});
		
		var stage = new Model();
		fence.load('models/music festival/stage.glb', (loadedModel) => {
			fence.setColor(color);
			var shape = fence.createTriangleMeshShape();
			var mesh = fence.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(0,0,-80));
			obj.addToWorld();
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-40,0,-25));
			obj.setRotation(0,Math.PI/2,0);
			obj.addToWorld();
		});
		var fountain = new Model();
		fountain.load('models/music festival/fountain.glb', (loadedModel) => {
			fountain.setColor(color);
			var shape = fountain.createConvexHullShape();
			var mesh = fountain.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(20,0,-50));
			obj.addToWorld();
		});
		var clockTower = new Model();
		clockTower.load('models/music festival/clock tower.glb', (loadedModel) => {
			clockTower.setColor(color);
			var shape = clockTower.createConvexHullShape();
			var mesh = clockTower.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(40,0,-10));
			obj.addToWorld();
		});
		var circusTent = new Model();
		circusTent.load('models/music festival/circus tent.glb', (loadedModel) => {
			circusTent.setColor(color);
			var shape = circusTent.createConvexHullShape();
			var mesh = circusTent.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(50,0,-40));
			obj.setRotation(0,-Math.PI,0);
			obj.addToWorld();
		});
		var van = new Model();
		van.load('models/music festival/van.glb', (loadedModel) => {
			van.setColor(color);
			var shape = van.createConvexHullShape();
			var mesh = van.createConvexHullMesh();
			
			for(var j = 0 ; j < 2;j++){
				for(var i = 0 ; i < 4;i++){
					var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,500,new THREE.Vector3(10+(i*3-5)*10+4,1,20+j*3*10+4));
					obj.rigidBody.setFriction(1); 
					obj.addToWorld();
				}
			}
		});
		for(var i = 0 ; i < 2;i++)
			for(var j = 0 ; j < 2;j++)
				for(var k = 0 ; k < 4;k++){
					var cube = new PhysicsCube(1,10,new THREE.Vector3(-60+i,j+.5,-60+j));
					cube.setColor(color);
					cube.addToWorld();
				}
		
		var starModel = new Model();
		starModel.load('models/star.glb', (loadedModel) => {
			starModel.setColor(0xffff00);
			var star1 = new Star(loadedModel,new THREE.Vector3(0,2,-40));
			star1.addToWorld();
			var star2 = new Star(loadedModel,new THREE.Vector3(-30,2,-30));
			star2.addToWorld();
			var star3 = new Star(loadedModel,new THREE.Vector3(30,2,-30));
			star3.addToWorld();	
			var star4 = new Star(loadedModel,new THREE.Vector3(0,2,-90));
			star4.addToWorld();	
			var star5 = new Star(loadedModel,new THREE.Vector3(0,2,90));
			star5.addToWorld();			
		});
		
		var vehicle = new Model();
		vehicle.load('models/vehicles/lamborghini orange.glb', (loadedModel) => {
			var shape = vehicle.createConvexHullShape();
			var mesh = vehicle.createConvexHullMesh();
			var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(60,10,80),0,.3,-1.45,1.45,2500);		
				car.rotateVehicleY(Math.PI);	
		});
		if(numPlayers>1)
		{
			var vehicle2 = new Model();
			vehicle2.load('models/vehicles/lamborghini blue.glb', (loadedModel) => {
				var shape = vehicle2.createConvexHullShape();
				var mesh = vehicle2.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(70,10,80),1,.3,-1.45,1.45,2500);
				car.rotateVehicleY(Math.PI);		
			});	
		}
		if(numPlayers>2){
			var vehicle3 = new Model();
			vehicle3.load('models/vehicles/lamborghini yellow.glb', (loadedModel) => {
				var shape = vehicle3.createConvexHullShape();
				var mesh = vehicle3.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(80,10,80),2,.3,-1.45,1.45,2500);
				car.rotateVehicleY(Math.PI);				
			});	
		}
		if(numPlayers>3){
			var vehicle4 = new Model();
			vehicle4.load('models/vehicles/lamborghini purple.glb', (loadedModel) => {
				var shape = vehicle4.createConvexHullShape();
				var mesh = vehicle4.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(90,10,80),3,.3,-1.45,1.45,2500);	
				car.rotateVehicleY(Math.PI);			
			});	
		}
	}
}
export{ MusicFestival };