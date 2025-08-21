import * as THREE from 'three';
import { Scene } from '/src/SceneManager.js';
import { PhysicsVehicle, PhysicsMesh, Star , PhysicsCube, FlyingVehicle} from '/src/PhysicsWorld.js';
import { Model } from '/src/Model.js';
class WizardSchool extends Scene{
	load(){
		
		this.flashText("Wizard School");
		sceneManager.addDefaultLight();
		this.song = 'music/Loud Pipes.ogg';
		console.log("Loading Wizard School Level");
		this.setSkyColor(0x000);
		
		//var color = 0x320d79 ;
		var color = 0x3a087c ;
		// Moon
		
		var waterGeometry = new THREE.SphereGeometry(50);
		var waterMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color().setHex('0xAAAA66') });
		var mesh = new THREE.Mesh(waterGeometry, waterMaterial);
		mesh.position.copy( new THREE.Vector3(1000,1000,1000));
		sceneManager.scene.add(mesh);
		
		
		var terrain = new Model();
		terrain.load('models/wizard school/terrain.glb', (loadedModel) => {
			terrain.setColor(color);
			var shape = terrain.createTriangleMeshShape();
			var mesh = terrain.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(0,0,0));
			obj.addToWorld();
		});
		
		// Water
		var waterGeometry = new THREE.BoxGeometry(200, .1, 200);
		var waterMaterial = new THREE.MeshStandardMaterial({ color: 0x000000,
									transparent: true,      //  Required for opacity to work
									opacity: 0.5,           // 0.0 (fully transparent) to 1.0 (opaque)
									roughness: 0.3,         // More realistic water if roughness < 0.5
									metalness: 0.1          // Optional);
								});
		var mesh = new THREE.Mesh(waterGeometry, waterMaterial);
		mesh.position.x=20;
		mesh.position.y=-8;
		sceneManager.scene.add(mesh);
		
		var castle = new Model();
		castle.load('models/wizard school/castle.glb', (loadedModel) => {
			castle.setColor(color);
			var shape = castle.createTriangleMeshShape();
			var mesh = castle.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(0,0,0));
			obj.addToWorld();
		});
		
		var stadium = new Model();
		stadium.load('models/wizard school/stadium.glb', (loadedModel) => {
			stadium.setColor(color);
			var shape = stadium.createTriangleMeshShape();
			var mesh = stadium.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-10,0,0));
			obj.addToWorld();
		});
		
		var hut = new Model();
		hut.load('models/wizard school/hut.glb', (loadedModel) => {
			hut.setColor(color);
			var shape = hut.createConvexHullShape();
			var mesh = hut.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(0,0,0));
			obj.addToWorld();
		});
		
		var tree1 = new Model();
		tree1.load('models/wizard school/tree 1st.glb', (loadedModel) => {
			tree1.setColor(color);
			var shape = tree1.createConvexHullShape();
			var mesh = tree1.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-93,13,-73));
			obj.addToWorld();
			var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-73,6,-93));
			obj2.addToWorld();
			var obj3 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-37,6,-111));
			obj3.addToWorld();
			var obj4 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-2,1,-115));
			obj4.addToWorld();
			var obj5 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-17,4,-122));
			obj5.addToWorld();
			var obj6 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-44,7,-129));
			obj6.addToWorld();
			var obj7 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-56,8,-128));
			obj7.addToWorld();
			var obj8 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-77,6,-128));
			obj8.addToWorld();
			var obj9 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-98,6,-100));
			obj9.addToWorld();
			var obj10 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-104,5,-108));
			obj10.addToWorld();
			var obj11 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-104,5,-117));
			obj11.addToWorld();
			var obj12 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-75,6,-117));
			obj12.addToWorld();
		});
		var tree2 = new Model();
		tree2.load('models/housing development/tree.glb', (loadedModel) => {
			tree2.setColor(color);
			var shape = tree2.createConvexHullShape();
			var mesh = tree2.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-79,2,4));
			obj.addToWorld();
			var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-14,-1,105));
			obj2.addToWorld();
			var obj3 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(100,-2,92));
			obj3.addToWorld();			
		});
		var greenhouse = new Model();
		greenhouse.load('models/wizard school/greenhouse.glb', (loadedModel) => {
			greenhouse.setColor(color);
			var shape = greenhouse.createConvexHullShape();
			var mesh = greenhouse.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(0,0,0));
			obj.addToWorld();
			var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(10,0,-2));
			obj2.addToWorld();
		});
		
		var willow = new Model();
		willow.load('models/wizard school/willow.glb', (loadedModel) => {
			willow.setColor(color);
			var shape = willow.createConvexHullShape();
			var mesh = willow.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(0,0,0));
			obj.addToWorld();
		});
		var pumpkin = new Model();
		pumpkin.load('models/wizard school/pumpkin.glb', (loadedModel) => {
			pumpkin.setColor(color);
			var shape = pumpkin.createConvexHullShape();
			var mesh = pumpkin.createConvexHullMesh();
			
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(-19,5,-97));
			obj.addToWorld();
			var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(-17,5,-97));
			obj2.addToWorld();
			
			var obj3 = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(-19,5,-95));
			obj3.addToWorld();
			var obj4 = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(-17,5,-95));
			obj4.addToWorld();
		});
		
		var starModel = new Model();
		starModel.load('models/star.glb', (loadedModel) => {
			starModel.setColor(0xffff00);
			var star1 = new Star(loadedModel,new THREE.Vector3(-20,7,-103));
			star1.addToWorld();
			var star2 = new Star(loadedModel,new THREE.Vector3(-6,2,-48));
			star2.addToWorld();
			var star3 = new Star(loadedModel,new THREE.Vector3(28,2,-62));
			star3.addToWorld();
			var star4 = new Star(loadedModel,new THREE.Vector3(-74,8,48));
			star4.addToWorld();
		});
				
		var vehicle = new Model();
		vehicle.load('models/vehicles/jeep blue.glb', (loadedModel) => {
			var shape = vehicle.createConvexHullShape();
			var mesh = vehicle.createConvexHullMesh();
			var car = new FlyingVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(100,50,100),0);
			car.rotateVehicleY(Math.PI);
		});
		if(numPlayers>1)
		{
			var vehicle2 = new Model();
			vehicle2.load('models/vehicles/jeep pink.glb', (loadedModel) => {
				var shape = vehicle2.createConvexHullShape();
				var mesh = vehicle2.createConvexHullMesh();
			var car = new FlyingVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(110,50,100),1);
				car.rotateVehicleY(Math.PI);
			});	
		}
		if(numPlayers>2){
			var vehicle3 = new Model();
			vehicle3.load('models/vehicles/jeep lime.glb', (loadedModel) => {
				var shape = vehicle3.createConvexHullShape();
				var mesh = vehicle3.createConvexHullMesh();
				var car = new FlyingVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(120,50,100),2);
				car.rotateVehicleY(Math.PI);
			});	
		}
		if(numPlayers>3){
			var vehicle4 = new Model();
			vehicle4.load('models/vehicles/jeep orange.glb', (loadedModel) => {
				var shape = vehicle4.createConvexHullShape();
				var mesh = vehicle4.createConvexHullMesh();
				var car = new FlyingVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(130,50,100),3);
				car.rotateVehicleY(Math.PI);
			});	
		}
	}
}
export{ WizardSchool };