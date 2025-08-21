import * as THREE from 'three';
import { Scene } from '/src/SceneManager.js';
import { PhysicsVehicle, PhysicsMesh, PhysicsCube, PhysicsBox , Star} from '/src/PhysicsWorld.js';
import { Model } from '/src/Model.js';
class TeaParty extends Scene{
	load(){
		// Init
		this.flashText("Tea Party");
		this.song = 'music/El Pico.ogg';
		console.log("Loading Tea Party Level");
		
		// Lighting
		sceneManager.addDefaultLight();		
		this.setSkyColor(0xff86b3 );
		//sceneManager.dirLight.position.set(60, 40, 60);
		sceneManager.dirLight.position.set(100, 50, 100);

		sceneManager.dirLight.target.position.set(0, 0, 0);
		sceneManager.dirLight.shadow.bias = -0.0001;
		sceneManager.dirLight.shadow.normalBias = 0.5;
		var color = 0x4beaff;
		var color2 = 0x00ff00;
		var color3 = 0x0000ff ;
		
		// Objects
		var floor = new PhysicsCube(400,0,new THREE.Vector3(0,-200,0));
		floor.setColor(color2);
		floor.addToWorld();
		
		var cloth = new Model();
		cloth.load('models/tea party/cloth.glb', (loadedModel) => {
			var shape = cloth.createTriangleMeshShape();
			var mesh = cloth.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(0,0,0));
			obj.addToWorld();
			cloth.setColor(color, true);
			
		});
		var table = new Model();
		table.load('models/tea party/table.glb', (loadedModel) => {
			
			var shape = table.createTriangleMeshShape();
			var mesh = table.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(0,0,0));
			obj.addToWorld();
			table.setColor(color);
		});
		
		var plate = new Model();
		plate.load('models/tea party/plate.glb', (loadedModel) => {
			plate.setColor(color);
			var shape = plate.createConvexHullShape();
			var mesh = plate.createConvexHullMesh();
			for(var j = -1; j < 2; j +=2)
			for(var i = -2; i < 2; i ++){
				var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(i*12,22,j*8));
				obj.addToWorld();
			}
		});
		var teaCup = new Model();
		teaCup.load('models/tea party/tea cup.glb', (loadedModel) => {
			teaCup.setColor(color);
			var shape = teaCup.createConvexHullShape();
			var mesh = teaCup.createConvexHullMesh();
			for(var j = -1; j < 2; j +=2)
			for(var i = -2; i < 2; i ++){
				var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(i*12,23,j*8));
				obj.addToWorld();
			}
		});
		
		var cupcake = new Model();
		cupcake.load('models/tea party/cupcake.glb', (loadedModel) => {
			cupcake.setColor(color);
			var shape = cupcake.createConvexHullShape();
			var mesh = cupcake.createConvexHullMesh();
			for(var j = -1; j < 2; j +=2)
			for(var i = -2; i < 2; i ++){
				var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(i*12+3,22,j*8));
				obj.addToWorld();
			}
		});
		var teaPot = new Model();
		teaPot.load('models/tea party/tea pot.glb', (loadedModel) => {
			teaPot.setColor(color);
			var shape = teaPot.createConvexHullShape();
			var mesh = teaPot.createConvexHullMesh();
			for(var i = -1; i < 2; i +=2){
				var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(16*i,22,0));
				obj.setRotation(0,Math.PI/2,0)
				obj.addToWorld();			
			}
		});
		var teaPotHandle = new Model();
		teaPotHandle.load('models/tea party/tea pot handle.glb', (loadedModel) => {
			teaPotHandle.setColor(color);
			var shape = teaPotHandle.createConvexHullShape();
			var mesh = teaPotHandle.createConvexHullMesh();
			for(var i = -1; i < 2; i +=2){
				var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(16*i,25,0));
				obj.setRotation(0,Math.PI/2,0)
				obj.addToWorld();			
			}
		});
		
		var candleBase = new Model();
		candleBase.load('models/tea party/candle base.glb', (loadedModel) => {
			candleBase.setColor(color);
			var shape = candleBase.createConvexHullShape();
			var mesh = candleBase.createConvexHullMesh();
			for(var i = -2; i < 2;i+=2){
				var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(5*i,22,0));
				obj.addToWorld();
			}
			candleBase.setColor(color);
		});
		var candle = new Model();
		candle.load('models/tea party/candle.glb', (loadedModel) => {
			candle.setColor(color);
			var shape = candle.createConvexHullShape();
			var mesh = candle.createConvexHullMesh();
			for(var j = -1; j < 2;j++)
			for(var i = -2; i < 2;i+=2){
				var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,10,new THREE.Vector3(5*i,24.5,j*1.25));
				obj.addToWorld();
			}
		});
		
		var topHat = new Model();
		topHat.load('models/tea party/top hat.glb', (loadedModel) => {
			var shape = topHat.createConvexHullShape();
			var mesh = topHat.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,10,new THREE.Vector3(-26,22,0));
			obj.addToWorld();
			topHat.setColor(color);
		});
		
		var armchair = new Model();
		armchair.load('models/tea party/armchair.glb', (loadedModel) => {
			var shape = armchair.createTriangleMeshShape();
			var mesh = armchair.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(47,0,0));
			obj.setRotation(0,-Math.PI*(7/8),0)
			obj.addToWorld();
			armchair.setColor(color);
		});
		
		var mushroom1 = new Model();
		mushroom1.load('models/tea party/mushroom1.glb', (loadedModel) => {
			var shape = mushroom1.createTriangleMeshShape();
			var mesh = mushroom1.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(-80,0,20));
			obj.addToWorld();
			mushroom1.setColor(color);
		});
		var mushroom2 = new Model();
		mushroom2.load('models/tea party/mushroom2.glb', (loadedModel) => {
			mushroom2.setColor(color);
			var shape = mushroom2.createTriangleMeshShape();
			var mesh = mushroom2.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(-90,0,40));
			obj.addToWorld();
			var obj2 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(60,0,50));
			obj2.addToWorld();
			var obj3 = new PhysicsMesh(loadedModel.clone(),shape,mesh,0,new THREE.Vector3(40,0,-30));
			obj3.addToWorld();
		});
		var mushroom3 = new Model();
		mushroom3.load('models/tea party/mushroom3.glb', (loadedModel) => {
			
			var shape = mushroom3.createTriangleMeshShape();
			var mesh = mushroom3.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(-80,0,60));
			obj.addToWorld();
			mushroom3.setColor(color);
		});
		var tree = new Model();
		tree.load('models/tea party/tree.glb', (loadedModel) => {
			var shape = tree.createTriangleMeshShape();
			var mesh = tree.createConvexHullMesh();
			var obj = new PhysicsMesh(loadedModel,shape,mesh,0,new THREE.Vector3(-80,0,60));
			obj.addToWorld();
			tree.setColor(color);
		});
		var incline = new PhysicsBox(55,.1,4,0,new THREE.Vector3(-54.5,10.8,-7));
		incline.setColor(color);
		incline.setRotation(0,0,Math.PI/7.8);
		incline.addToWorld();
				
		var vehicle = new Model();
		vehicle.load('models/vehicles/jeep blue.glb', (loadedModel) => {
			var shape = vehicle.createConvexHullShape();
			var mesh = vehicle.createConvexHullMesh();
			var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(0,4,50),0);
			car.rotateVehicleY(Math.PI);
		});
		if(numPlayers>1)
		{
			var vehicle2 = new Model();
			vehicle2.load('models/vehicles/jeep pink.glb', (loadedModel) => {
				var shape = vehicle2.createConvexHullShape();
				var mesh = vehicle2.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(-10,4,50),1);
				car.rotateVehicleY(Math.PI);
			});	
		}
		if(numPlayers>2){
			var vehicle3 = new Model();
			vehicle3.load('models/vehicles/jeep lime.glb', (loadedModel) => {
				var shape = vehicle3.createConvexHullShape();
				var mesh = vehicle3.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(10,4,50),2);
				car.rotateVehicleY(Math.PI);
			});	
		}
		if(numPlayers>3){
			var vehicle4 = new Model();
			vehicle4.load('models/vehicles/jeep orange.glb', (loadedModel) => {
				var shape = vehicle4.createConvexHullShape();
				var mesh = vehicle4.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(20,4,50),3);
				car.rotateVehicleY(Math.PI);
			});	
		}
		
		var starModel = new Model();
		starModel.load('models/star.glb', (loadedModel) => {
			starModel.setColor(0xffff00);
			var star1 = new Star(loadedModel.clone(),new THREE.Vector3(-22,23,0));
			star1.addToWorld();
			var star2 = new Star(loadedModel.clone(),new THREE.Vector3(22,23,0));
			star2.addToWorld();
			var star3 = new Star(loadedModel.clone(),new THREE.Vector3(0,2,0));
			star3.addToWorld();
			var star4 = new Star(loadedModel.clone(),new THREE.Vector3(-33,22,-7));
			star4.addToWorld();
			var star5 = new Star(loadedModel.clone(),new THREE.Vector3(-52,14,-7));
			star5.addToWorld();
			var star6 = new Star(loadedModel.clone(),new THREE.Vector3(-55,2,6));
			star6.addToWorld();
		});
	}
}
export{ TeaParty };