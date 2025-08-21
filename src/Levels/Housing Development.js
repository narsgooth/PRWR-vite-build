import * as THREE from 'three';
import { Scene } from '/src/SceneManager.js';
import { PhysicsVehicle, PhysicsMesh, Star , PhysicsCube } from '/src/PhysicsWorld.js';
import { Model } from '/src/Model.js';

class UpdateSky{
	constructor(scene){
		
		this.scene = scene;
		this.random = Math.random() ;
		sceneManager.objects.push(this);//update logic 
		sceneManager.scene.fog = new THREE.Fog(0x111111, 3, 100);
	}
	removeFromWorld()	{
	}
	synchronize(){
		if(Math.random()<.01)
		{
			this.scene.setSkyColor(0xFFFFFF);
			sceneManager.ambientLight.intensity =20;
		}
		else{
			this.scene.setSkyColor(0x111111);
			sceneManager.ambientLight.intensity =.5
		}			
	}
}

class HousingDevelopment extends Scene{
	load(){
		// Init
		this.flashText("Housing Development");
		this.song = 'music/Bruleé.ogg';
		console.log("Loading Housing Development");
		
		// Lighting
		sceneManager.addDefaultLight();
		var a = new UpdateSky(this);
		var color = 0x320d79 ;
		
		//Objects
		
		var moonGeometry = new THREE.SphereGeometry(50);
		var moonMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color().setHex('0xAAAA66') });
		var mesh = new THREE.Mesh(moonGeometry, moonMaterial);
		mesh.position.copy( new THREE.Vector3(1000,1000,1000));
		sceneManager.scene.add(mesh);
		
		var numHouses = 5;
		var house = new Model();
		house.load('models/housing development/house.glb', (loadedModel) => {
			house.setColor(color);
			var shape = house.createTriangleMeshShape();
			var mesh = house.createConvexHullMesh();
			for(var i = -2 ; i <= 2; i++)
			{
				var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-15,0,6+(24)*i));
				obj.addToWorld();
				
				var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(15,0,6+(24)*i));
				obj2.setRotation(0,Math.PI,0);
				obj2.addToWorld();
				
				var obj3 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(40,0,6+(24)*i));
				obj3.setRotation(0,Math.PI,0);
				obj3.addToWorld();
				
				var obj4 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-40,0,6+(24)*i));
				obj4.addToWorld();
			}
		});
		var tree = new Model();
		tree.load('models/housing development/tree.glb', (loadedModel) => {
			tree.setColor(color);
			var shape = tree.createTriangleMeshShape();
			var mesh = tree.createConvexHullMesh();
			for(var i = -2 ; i <= 2; i++)
			{
				var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-24,0,-6+(24)*i));
				obj.addToWorld();
				
				var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(24,0,-6+(24)*i));
				obj2.setRotation(0,Math.PI,0);
				obj2.addToWorld();
			}
		});
		
		var garbageCan = new Model();
		garbageCan.load('models/housing development/garbage can.glb', (loadedModel) => {
			garbageCan.setColor(color);
			var shape1 = garbageCan.createConvexHullShape();
			var mesh1 = garbageCan.createConvexHullMesh();			
			var garbageLid = new Model();
			garbageLid.load('models/housing development/garbage lid.glb', (loadedModel2) => {
				garbageLid.setColor(color);
				var shape2 = garbageLid.createConvexHullShape();
				var mesh2 = garbageLid.createConvexHullMesh();								
				
				for(var j = -1 ; j<=1;j+=2)
				for(var i = -3 ; i< 3;i++)
				{
					var obj = new PhysicsMesh(loadedModel.clone(),shape1,mesh1,1,new THREE.Vector3(j*6,0,i*24));
					var obj2 = new PhysicsMesh(loadedModel2.clone(),shape2,mesh2,1,new THREE.Vector3(j*6,2,i*24));
					if(j==1){
						obj.setRotation(0,Math.PI,0);
						obj2.setRotation(0,Math.PI,0);
					}						
					obj.addToWorld();
					obj2.addToWorld();
					let hingeConstraint  = new Ammo.btHingeConstraint(
																obj2.rigidBody, 
																obj.rigidBody, 
																new Ammo.btVector3(-.7,-.15,0),//pivotA: garbage lid
																new Ammo.btVector3(-.7,.65,0),//pivotB: can
																new Ammo.btVector3(0, 0, -1),//axisA:y-axis 
																new Ammo.btVector3(0, 0, -1)//axisB:y-axis,
															);
					world.addConstraint( hingeConstraint , false );
				}
			});
		});
		
		/*
		var a = new PhysicsCube(1,1,new THREE.Vector3(0,0,-10));
		a.addToWorld();
		var b = new PhysicsCube(1,0,new THREE.Vector3(0,1,-10));
		b.addToWorld();
		let hingeConstraint  = new Ammo.btHingeConstraint( 
															a.rigidBody, 
															b.rigidBody, 
															new Ammo.btVector3(.5,-.5,0),//pivotA: garbage can
															new Ammo.btVector3(.5,-.5,0),//pivotB: lid
															new Ammo.btVector3(0, 0, -1),//axisA:y-axis 
															new Ammo.btVector3(0, 0, -1)//axisB:y-axis,
														);
		world.addConstraint( hingeConstraint , false );
		//hingeConstraint.setMaxMotorImpulse(.01); // lower motor torque
		//hingeConstraint.enableAngularMotor(true, 0, 0.1); // motor on, target velocity 0, low force		
		//hingeConstraint.setLimit(0,Math.PI)
		*/
		
		var fence = new Model();
		fence.load('models/housing development/fence.glb', (loadedModel) => {
			fence.setColor(color);
			var shape = fence.createConvexHullShape();
			var mesh = fence.createConvexHullMesh();
			for(var i = -3 ; i < 2; i++)
			{
				var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(-15,.5,15+i*24));
				obj.rigidBody.setDamping(0.1,0.1);
				obj.setRotation(0,Math.PI,0);
				obj.addToWorld();
				var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(-15,.5,21+i*24));
				obj2.rigidBody.setDamping(0.1,0.1);
				obj2.setRotation(0,Math.PI,0);
				obj2.addToWorld();
				
				var obj3 = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(15,.5,15+i*24));
				obj3.rigidBody.setDamping(0.1,0.1);
				obj3.addToWorld();
				var obj4 = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(15,.5,21+i*24));
				obj4.rigidBody.setDamping(0.1,0.1);
				obj4.addToWorld();
			}
			
			for(var i = -8 ; i < 8; i++)
			{
				var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(-30,.5,i*5.95));
				obj.rigidBody.setDamping(0.1,0.1);
				obj.addToWorld();
				
				var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(30,.5,i*5.95));
				obj2.rigidBody.setDamping(0.1,0.1);
				obj2.addToWorld();
			}
		});
		var floor = new PhysicsCube(120,0,new THREE.Vector3(0,-60,0));
		floor.setColor(color);
		floor.addToWorld();
		
		var vehicle = new Model();
		vehicle.load('models/vehicles/jeep blue.glb', (loadedModel) => {
			var shape = vehicle.createConvexHullShape();
			var mesh = vehicle.createConvexHullMesh();
			var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(5,10,-15),0);
		});
		if(numPlayers>1)
		{
			var vehicle2 = new Model();
			vehicle2.load('models/vehicles/jeep pink.glb', (loadedModel) => {
				var shape = vehicle2.createConvexHullShape();
				var mesh = vehicle2.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(-5,10,-15),1);
			});	
		}
		if(numPlayers>2){
			var vehicle3 = new Model();
			vehicle3.load('models/vehicles/jeep lime.glb', (loadedModel) => {
				var shape = vehicle3.createConvexHullShape();
				var mesh = vehicle3.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(5,10,-25),2);
			});	
		}
		if(numPlayers>3){
			var vehicle4 = new Model();
			vehicle4.load('models/vehicles/jeep orange.glb', (loadedModel) => {
				var shape = vehicle4.createConvexHullShape();
				var mesh = vehicle4.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(-5,10,-25),3);
			});	
		}
		
		var starModel = new Model();
		starModel.load('models/star.glb', (loadedModel) => {
			starModel.setColor(0xffff00);
			var star1 = new Star(loadedModel,new THREE.Vector3(50,2,0));
			star1.addToWorld();
			var star2 = new Star(loadedModel,new THREE.Vector3(-50,2,0));
			star2.addToWorld();
			var star3 = new Star(loadedModel,new THREE.Vector3(0,2,-50));
			star3.addToWorld();
			var star4 = new Star(loadedModel,new THREE.Vector3(0,2,50));
			star4.addToWorld();
		});
	}
}
export{ HousingDevelopment };