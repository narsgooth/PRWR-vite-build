import * as THREE from 'three';
import { Scene } from '/src/SceneManager.js';
import { PhysicsVehicle, PhysicsMesh, PhysicsBox, PhysicsCube, MovingBox , Star} from '/src/PhysicsWorld.js';
import { Model } from '/src/Model.js';

class DominoSpace extends Scene{
	load(){
		// Init
		this.flashText("Domino Space");
		this.song = 'music/Kennedy.ogg';
		console.log("Loading Domino Room Level");
		
		// Lighting
		sceneManager.addDefaultLight();
		this.setSkyColor(0x000);		
		var color = 0xff0000;		
		var color2 = 0x559d00  ;
		
		// Objects
		var floor = new PhysicsCube(80,0,new THREE.Vector3(-60,-40,0));
		floor.setColor(color);
		floor.addToWorld();
		
		var floor = new PhysicsCube(80,0,new THREE.Vector3(60,-40,0));
		floor.setColor(color);
		floor.addToWorld();
		this.placeDominosOnCurve("spiral", 185,new THREE.Vector3(60,0,0));
		this.placeDominosOnCurve("sine", 80,new THREE.Vector3(-85,0,-10));
		this.placeDominosOnCurve("sine", 80,new THREE.Vector3(-85,0,10));



		const movingPlatform = new MovingBox(
			10, 1, 10,
			new THREE.Vector3(15, -.5, 0),   // point A
			new THREE.Vector3(-15, -.5, 0),  // point B
			0.001                           // speed (fraction per second)
		);
		movingPlatform.setColor(color);
		movingPlatform.addToWorld();
		
		var starModel = new Model();
		starModel.load('models/star.glb', (loadedModel) => {
			starModel.setColor(0xffff00);
			var star1 = new Star(loadedModel,new THREE.Vector3(-85,2,8.5));
			star1.addToWorld();
			var star2 = new Star(loadedModel,new THREE.Vector3(60,2,-37));
			star2.addToWorld();
			var star3 = new Star(loadedModel,new THREE.Vector3(0,2,0));
			star3.addToWorld();
			var star4 = new Star(loadedModel,new THREE.Vector3(-85,2,-12));
			star4.addToWorld();
			
		});
		
		var vehicle = new Model();
		vehicle.load('models/vehicles/jeep blue.glb', (loadedModel) => {
			var shape = vehicle.createConvexHullShape();
			var mesh = vehicle.createConvexHullMesh();
			var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(60,10,-5),0);			
		});
		if(numPlayers>1)
		{
			var vehicle2 = new Model();
			vehicle2.load('models/vehicles/jeep pink.glb', (loadedModel) => {
				var shape = vehicle2.createConvexHullShape();
				var mesh = vehicle2.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(70,10,-5),1);				
			});	
		}
		if(numPlayers>2){
			var vehicle3 = new Model();
			vehicle3.load('models/vehicles/jeep lime.glb', (loadedModel) => {
				var shape = vehicle3.createConvexHullShape();
				var mesh = vehicle3.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(60,10,-10),2);				
			});	
		}
		if(numPlayers>3){
			var vehicle4 = new Model();
			vehicle4.load('models/vehicles/jeep orange.glb', (loadedModel) => {
				var shape = vehicle4.createConvexHullShape();
				var mesh = vehicle4.createConvexHullMesh();
				var car = new PhysicsVehicle(loadedModel,shape,mesh,800,new THREE.Vector3(70,10,-10),3);				
			});	
		}
	}
	placeDominosOnCurve(shape = "sine", count = 200, offset = new THREE.Vector3(0,0,0), mass = 0.2) {
    function getSpiralPoint(theta) {
        let r = 5 + theta * 3; // radius grows (adjust 5 for spacing density)
        return new THREE.Vector3(
            Math.cos(theta) * r,
            1,
            Math.sin(theta) * r
        );
    }

    function getCurvePoint(t) {
        switch (shape) {
            case "circle":
                let radius = 20;
                return new THREE.Vector3(
                    Math.cos(t * Math.PI * 2) * radius,
                    1,
                    Math.sin(t * Math.PI * 2) * radius
                );
            case "spiral":
                // Instead of using t directly, we’ll interpret t as theta
                return getSpiralPoint(t);
            case "sine":
            default:
                return new THREE.Vector3(
                    t * 50,
                    1,
                    Math.sin(t * Math.PI * 4) * 10
                );
        }
    }

    // --- NEW: compute spiral angles with equal spacing ---
    let spiralThetas = [];
    if (shape === "spiral") {
        let theta = 0;
        for (let i = 0; i < count; i++) {
            spiralThetas.push(theta);

            // arc length differential
            let r = 5 + theta * 2;
            let drdθ = 5; // derivative of r wrt θ
            let ds_dθ = Math.sqrt(r * r + drdθ * drdθ);
            let dθ = 1.0 / ds_dθ; // 1 unit apart (adjust denominator for tighter/looser spacing)

            theta += dθ;
        }
    }

    for (let i = 0; i < count; i++) {
        let pos;
        if (shape === "spiral") {
            pos = getSpiralPoint(spiralThetas[i]);
        } else {
            let t = i / (count - 1);
            pos = getCurvePoint(t);
        }

        // Tangent direction
let dir;
if (shape === "spiral") {
    // Use a forward difference in θ based on local arc-length step
    const theta = spiralThetas[i];
    const r = 5 + theta * 5;   // match your spiral r = 5 + 5*θ
    const drdθ = 5;
    const ds_dθ = Math.sqrt(r * r + drdθ * drdθ);
    const dθ = 1.0 / ds_dθ;    // ~1 unit spacing along arc (same as when you built spiralThetas)
    const nextPos = getSpiralPoint(theta + dθ);
    dir = nextPos.clone().sub(pos).normalize();
} else {
    // Original behavior for non-spiral
    const tNext = Math.min((i + 1) / (count - 1), 1);
    const nextPos = getCurvePoint(tNext);
    dir = nextPos.clone().sub(pos).normalize();
}

        // Y-axis rotation from direction
        let angleY = Math.atan2(dir.x, dir.z);

        // Create domino
        let domino = new PhysicsBox(1, 2, 0.1, mass, pos.add(offset));
        domino.setColor(0xffffff);
        domino.setRotation(0, angleY, 0);
        domino.addToWorld();
    }
}

	
}
export{ DominoSpace };