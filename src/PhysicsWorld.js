globalThis.materialInteractive = new THREE.MeshBasicMaterial({ color: new THREE.Color().setHex(Math.random() * 0xFFFFFF) });
class PhysicsWorld{
	constructor(){
		//  Globals
		globalThis.DISABLE_DEACTIVATION = 4;
		globalThis.TRANSFORM_AUX = new Ammo.btTransform();
		globalThis.ZERO_QUATERNION = new THREE.Quaternion(0, 0, 0, 1);
		
		console.log("Creating Physics World");
		// Physics configuration
		const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
		const dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
		const broadphase = new Ammo.btDbvtBroadphase();
		const solver = new Ammo.btSequentialImpulseConstraintSolver();
		
		this.world = new Ammo.btDiscreteDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration );
		this.world.setGravity( new Ammo.btVector3( 0, -9.82, 0 ) );
	}
	run(dt){
		this.world.stepSimulation(dt, 10); // dt = deltaTime in seconds
	}
}
import * as THREE from 'three';
import { InputManager } from '/src/InputManager.js';

// Abstract 
class PhysicsObject{
	constructor(mass, pos){
		// Variables
		this.mass = mass;
		this.pos = pos;
		this.material = new THREE.MeshStandardMaterial({ color: new THREE.Color().setHex(Math.random() * 0xFFFFFF) });
	}
	createRigidBody(shape){
		const transform = new Ammo.btTransform();
		transform.setIdentity();
		transform.setOrigin(new Ammo.btVector3(this.pos.x, this.pos.y, this.pos.z));
		transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));

		const motionState = new Ammo.btDefaultMotionState(transform);
		const localInertia = new Ammo.btVector3(0, 0, 0);
		if (this.mass > 0) 
			shape.calculateLocalInertia(this.mass, localInertia);
		
		const rbInfo = new Ammo.btRigidBodyConstructionInfo(this.mass, motionState, shape, localInertia);
		this.rigidBody = new Ammo.btRigidBody(rbInfo);
		
		this.rigidBody.setDamping(0.01, 0.01); // aid drag force: linear damping, angular damping 
		this.rigidBody.setRestitution(.5); // set bouncyness
	}
	getPosition(){
		// Get current transform
		const transform = new Ammo.btTransform();
		return this.rigidBody.getMotionState().getWorldTransform(transform);
	}
	setPosition(x, y, z) {
		// Get current transform
		const transform = new Ammo.btTransform();
		this.rigidBody.getMotionState().getWorldTransform(transform);

		// Set new position
		transform.setOrigin(new Ammo.btVector3(x, y, z));

		// Apply updated transform to the rigid body
		this.rigidBody.setWorldTransform(transform);
		this.rigidBody.getMotionState().setWorldTransform(transform);
	}
	setRotation(eulerX, eulerY, eulerZ) {
		// Convert Euler angles (in radians) to THREE.Quaternion
		const euler = new THREE.Euler(eulerX, eulerY, eulerZ);
		const quaternion = new THREE.Quaternion().setFromEuler(euler);

		// Create Ammo.btQuaternion from THREE.Quaternion
		const ammoQuat = new Ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);

		// Get current transform
		const transform = new Ammo.btTransform();
		this.rigidBody.getMotionState().getWorldTransform(transform);

		// Set new rotation
		transform.setRotation(ammoQuat);

		// Apply updated transform to the rigid body
		this.rigidBody.setWorldTransform(transform);
		this.rigidBody.getMotionState().setWorldTransform(transform);
		this.synchronize(true);
	}

	addToWorld(){
		throw new Error('Method "addToWorld()" must be implemented');
	}
	removeFromWorld(){
		throw new Error('Method "removeFromWorld()" must be implemented');
	}
	setColor(color){
		this.material.color.set(color);
	}
	dispose(){
		if(this.rigidBody)
		{
			world.removeRigidBody(this.rigidBody);
			/*
			if (this.rigidBody.getMotionState()) {
				Ammo.destroy(this.rigidBody.getMotionState());
			}
			if (this.rigidBody.getCollisionShape()) {
				Ammo.destroy(this.rigidBody.getCollisionShape());
			}
			Ammo.destroy(this.rigidBody);
			*/
		}
	}
	synchronize(){
		throw new Error('Method "synchronize()" must be implemented');
	}
}

class PhysicsBox extends PhysicsObject{
	constructor(w,h,l, mass, pos) {
		// Initialization
		super(mass,pos);
		// Mesh
		const geometry = new THREE.BoxGeometry(w, h, l);
		this.mesh = new THREE.Mesh(geometry, this.material);
		this.mesh.position.copy(pos);
		this.mesh.quaternion.copy(ZERO_QUATERNION);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		// Physics
		var shape = new Ammo.btBoxShape(new Ammo.btVector3(w / 2, h / 2, l / 2));		
		this.createRigidBody(shape);
	}
	addToWorld(){
		world.addRigidBody(this.rigidBody);
		sceneManager.scene.add(this.mesh); // ensures .mesh exists
		sceneManager.objects.push(this);
	}
	removeFromWorld(){
		sceneManager.scene.remove(this.mesh);
		sceneManager.objects = sceneManager.objects.filter(item => item !== this);
		this.dispose();
	}
	synchronize(forceSync = false){
		if (this.mass > 0 || forceSync) {
			this.rigidBody.setActivationState(DISABLE_DEACTIVATION); // prevent sleeping
			const ms = this.rigidBody.getMotionState();
			if (ms) {
				ms.getWorldTransform(TRANSFORM_AUX);
				const p = TRANSFORM_AUX.getOrigin();
				const q = TRANSFORM_AUX.getRotation();
				this.mesh.position.set(p.x(), p.y(), p.z());
				this.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
			}
		}
	}
}
class MovingBox extends PhysicsBox {
    constructor(w, h, l, posA, posB, speed) {
        super(w, h, l, 0, posA); // mass=0 → static
        this.posA = posA.clone();
        this.posB = posB.clone();
        this.speed = speed; // units per second
        this.t = 0; // time accumulator
        this.direction = 1; // 1 = A→B, -1 = B→A
    }

    synchronize(forceSync = false) {
        // Move between A and B smoothly
        this.t += this.direction * this.speed;

        if (this.t >= 1) {
            this.t = 1;
            this.direction = -1;
        } else if (this.t <= 0) {
            this.t = 0;
            this.direction = 1;
        }

        const newPos = new THREE.Vector3().lerpVectors(this.posA, this.posB, this.t);

        // Update mesh
        this.mesh.position.copy(newPos);

        // Update rigid body transform manually
        const transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(newPos.x, newPos.y, newPos.z));
        transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1)); // no rotation
        this.rigidBody.setWorldTransform(transform);
        this.rigidBody.getMotionState().setWorldTransform(transform);
    }
}
class PhysicsCube extends PhysicsBox{
	constructor(size,mass,pos){
		super(size,size,size,mass,pos);
	}
}

class PhysicsBall extends PhysicsObject{
	constructor(radius, mass, pos) {
		// Initialization
		// Initialization
		super(mass,pos);
		// Mesh
		const geometry = new THREE.SphereGeometry(radius/2);
		this.mesh = new THREE.Mesh(geometry, this.material);
		this.mesh.position.copy(pos);
		this.mesh.quaternion.copy(new THREE.Quaternion(0, 0, 0, 1));
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		// Physics
		this.shape = new Ammo.btSphereShape(radius/2);	
		this.createRigidBody(this.shape);
	}
	addToWorld(){
		world.addRigidBody(this.rigidBody);
		sceneManager.scene.add(this.mesh); // ensures .mesh exists
		sceneManager.objects.push(this);
	}
	removeFromWorld(){
		sceneManager.scene.remove(this.mesh);
		sceneManager.objects = sceneManager.objects.filter(item => item !== this);
		this.dispose();
	}
	synchronize(forceSync = false){
		if (this.mass > 0 || forceSync) {
			this.rigidBody.setActivationState(DISABLE_DEACTIVATION); // prevent sleeping
			const ms = this.rigidBody.getMotionState();
			if (ms) {
				ms.getWorldTransform(TRANSFORM_AUX);
				const p = TRANSFORM_AUX.getOrigin();
				const q = TRANSFORM_AUX.getRotation();
				this.mesh.position.set(p.x(), p.y(), p.z());
				this.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
			}
		}
	}
}

class Star extends PhysicsObject{
	constructor(model,pos){
		super(1,pos);
		// Mesh
		this.model = model.clone();
		this.model.position.copy(pos);
		this.model.quaternion.copy(new THREE.Quaternion(0, 0, 0, 1));
		// Physics		
		this.shape = new Ammo.btBoxShape(new Ammo.btVector3(1,1,1));		
		this.createRigidBody(this.shape);		
		// Logic
		sceneManager.numStars++;		
	}
	addToWorld(){
		world.addRigidBody(this.rigidBody);
		this.rigidBody.setGravity(new Ammo.btVector3(0, 0, 0));
		sceneManager.scene.add(this.model); 
		sceneManager.objects.push(this);
	}
	removeFromWorld(){
		sceneManager.scene.remove(this.model);
		sceneManager.objects = sceneManager.objects.filter(item => item !== this);
		this.dispose();
	}
	synchronize(forceSync=false){
		if ( forceSync) {
			this.rigidBody.setActivationState(DISABLE_DEACTIVATION); // prevent sleeping
			const ms = this.rigidBody.getMotionState();
			if (ms) {
				ms.getWorldTransform(TRANSFORM_AUX);
				const p = TRANSFORM_AUX.getOrigin();
				const q = TRANSFORM_AUX.getRotation();
				this.model.position.set(p.x(), p.y(), p.z());
				this.model.quaternion.set(q.x(), q.y(), q.z(), q.w());
			}
		}
		this.model.rotation.y = sceneManager.time*5;
		
		if(Math.abs(this.rigidBody.getLinearVelocity().x())>.0001)
		{
			this.removeFromWorld();
			sceneManager.numStars--;
			console.log(sceneManager.numStars +" stars");
			if(sceneManager.numStars<=0)
				game.loadNextLevel();
		}
	}
}

class PhysicsMesh extends PhysicsObject{
	constructor(model, shape,mesh, mass, pos) {
		// Initialization
		super(mass, pos);
		this.model = model;
		this.model.position.copy(pos);
		// Mesh
		this.mesh = mesh;
		this.mesh.position.copy(pos);
		this.mesh.quaternion.copy(new THREE.Quaternion(0, 0, 0, 1));
		// Physics
		this.createRigidBody(shape);
		this.rigidBody.setActivationState(4); // prevent sleeping		
	}
	addToWorld(){
		world.addRigidBody(this.rigidBody);
		
		sceneManager.scene.add(this.model); // ensures .mesh exists
		if(_DEBUG)
			sceneManager.scene.add(this.mesh); // ensures .mesh exists
		sceneManager.objects.push(this);
	}
	removeFromWorld(){
		sceneManager.scene.remove(this.model);
		sceneManager.scene.remove(this.mesh);
		sceneManager.objects = sceneManager.objects.filter(item => item !== this);
		this.dispose();
	}
	setRotation(eulerX, eulerY, eulerZ) {
		super.setRotation(eulerX, eulerY, eulerZ);
	}
	synchronize(forceSync = false){
		if (this.mass > 0 || forceSync) {
			const ms = this.rigidBody.getMotionState();
			if (ms) {
				ms.getWorldTransform(TRANSFORM_AUX);
				const p = TRANSFORM_AUX.getOrigin();
				const q = TRANSFORM_AUX.getRotation();
				this.model.position.set(p.x(), p.y(), p.z());
				this.model.quaternion.set(q.x(), q.y(), q.z(), q.w());
				this.mesh.position.set(p.x(), p.y(), p.z());
				this.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
			}
		}
	}
}
class PhysicsVehicle extends PhysicsObject{
	constructor(model, shape,mesh,mass, pos,playerId,suspensionRestLength=.6,wheelAxisPositionBack=-1.2,wheelAxisFrontPosition = 1.8,maxEngineForce = 2000) {

		// Vehicle contants
		var massVehicle = 800;
		
		//var wheelAxisPositionBack = -1.2;
		var wheelRadiusBack = .425;//.4
		var wheelWidthBack = .3;
		var wheelHalfTrackBack = .85;
		var wheelAxisHeightBack = .3;

		//var wheelAxisFrontPosition = 1.8;
		var wheelHalfTrackFront = .85;
		var wheelAxisHeightFront = .3;
		var wheelRadiusFront = .425;
		var wheelWidthFront = .3;

		var friction = 1000;
		var suspensionStiffness = 20.0;
		var suspensionDamping = 2.3;
		var suspensionCompression = 4.4;
		//var suspensionRestLength = 0.4;
		var rollInfluence = 0.15;//0.2
		
		// Initialization
		super(mass,pos);
		this.playerId = playerId;
		this.defaultPosition = pos;
		this.offset = new THREE.Vector3(0, 2, -6); // desired camera offset
		
		this.maxEngineForce = maxEngineForce;
		// Mesh
		this.bodyModel = model.getObjectByName('body');
		this.mesh = mesh;
		// Physics	
		
		this.createRigidBody(shape);
		this.rigidBody.setActivationState(DISABLE_DEACTIVATION);
		
		// Raycast Vehicle
		var tuning = new Ammo.btVehicleTuning();
		var rayCaster = new Ammo.btDefaultVehicleRaycaster(world);
		this.vehicle = new Ammo.btRaycastVehicle(tuning, this.rigidBody, rayCaster);
		this.vehicle.setCoordinateSystem(0, 1, 2);
		world.addAction(this.vehicle);
		
		// Wheels
		this.vehicleSteering = 0;
		globalThis.FRONT_LEFT = 0;
		globalThis.FRONT_RIGHT = 1;
		globalThis.BACK_LEFT = 2;
		globalThis.BACK_RIGHT = 3;
		this.wheelMeshes = [];		
		var wheelModel = model.getObjectByName('wheel');
		this.wheelModels = [wheelModel,wheelModel.clone(true),wheelModel.clone(true),wheelModel.clone(true)];
		
		var wheelDirectionCS0 = new Ammo.btVector3(0, -1, 0);
		var wheelAxleCS = new Ammo.btVector3(-1, 0, 0);
		
		function createWheelMesh(radius, width,material) {
			var t = new THREE.CylinderGeometry(radius, radius, width, 24, 1);
			t.rotateZ(Math.PI / 2);
			var mesh = new THREE.Mesh(t, new THREE.MeshStandardMaterial({ color: new THREE.Color().setHex(Math.random() * 0xFFFFFF) }));
			mesh.add(new THREE.Mesh(new THREE.BoxGeometry(width * 1.5, radius * 1.75, radius*.25, 1, 1, 1), new THREE.MeshStandardMaterial({ color: new THREE.Color().setHex(Math.random() * 0xFFFFFF) })));
			return mesh;
		}
		this.addWheel = (isFront, pos, radius, width, index,vehicle) => {  
			var wheelInfo = vehicle.addWheel(
					pos,
					wheelDirectionCS0,
					wheelAxleCS,
					suspensionRestLength,
					radius,
					tuning,
					isFront);

			wheelInfo.set_m_suspensionStiffness(suspensionStiffness);
			wheelInfo.set_m_wheelsDampingRelaxation(suspensionDamping);
			wheelInfo.set_m_wheelsDampingCompression(suspensionCompression);
			wheelInfo.set_m_frictionSlip(friction);
			wheelInfo.set_m_rollInfluence(rollInfluence);
			
			this.wheelMeshes[index] = createWheelMesh(radius, width);
		}

		this.addWheel(true, new Ammo.btVector3(wheelHalfTrackFront, wheelAxisHeightFront, wheelAxisFrontPosition), wheelRadiusFront, wheelWidthFront, FRONT_LEFT, this.vehicle);
		this.addWheel(true, new Ammo.btVector3(-wheelHalfTrackFront, wheelAxisHeightFront, wheelAxisFrontPosition), wheelRadiusFront, wheelWidthFront, FRONT_RIGHT, this.vehicle);
		this.addWheel(false, new Ammo.btVector3(wheelHalfTrackBack, wheelAxisHeightBack, wheelAxisPositionBack), wheelRadiusBack, wheelWidthBack, BACK_LEFT, this.vehicle);
		this.addWheel(false, new Ammo.btVector3(-wheelHalfTrackBack, wheelAxisHeightBack, wheelAxisPositionBack), wheelRadiusBack, wheelWidthBack, BACK_RIGHT, this.vehicle);
		
		this.addToWorld();
	}
	addToWorld(){
		world.addRigidBody(this.rigidBody);
		if(_DEBUG)
			sceneManager.scene.add(this.mesh); // ensures .mesh exists
		sceneManager.scene.add(this.bodyModel); // ensures .mesh exists
		sceneManager.objects.push(this);
		for(var i = 0 ;i < 4; i++){
			if(_DEBUG)
				sceneManager.scene.add(this.wheelMeshes[i]);
			sceneManager.scene.add(this.wheelModels[i]); // ensures .mesh exists
		}
	}
	removeFromWorld(){
		sceneManager.scene.remove(this.bodyModel);
		sceneManager.scene.remove(this.mesh);
		for(var i = 0 ;i < 4; i++){
			sceneManager.scene.remove(this.wheelMeshes[i]);
			sceneManager.scene.remove(this.wheelModels[i]); // ensures .mesh exists
		}
		sceneManager.objects = sceneManager.objects.filter(item => item !== this);
		this.dispose();
	}
	resetPosition(x, y, z, rotationY = 0) {
		const transform = new Ammo.btTransform();
		transform.setIdentity();
		// Set new position
		transform.setOrigin(new Ammo.btVector3(x, y, z));
		// Set rotation around Y axis (optional)
		const quat = new THREE.Quaternion();
		quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotationY); // radians
		transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
		// Apply to rigid body
		this.rigidBody.setWorldTransform(transform);
		this.rigidBody.getMotionState().setWorldTransform(transform);
		// Clear velocity
		this.rigidBody.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
		this.rigidBody.setAngularVelocity(new Ammo.btVector3(0, 0, 0));
		// Reset suspension state
		this.vehicle.resetSuspension();
	}
	applyForces(){
		const velocity = this.rigidBody.getLinearVelocity();
		
		const forwardDir = this.vehicle.getForwardVector(); // returns btVector3

		// Convert Ammo.btVector3 to THREE.Vector3
		const vel = new THREE.Vector3(velocity.x(), velocity.y(), velocity.z());
		const forward = new THREE.Vector3(forwardDir.x(), forwardDir.y(), forwardDir.z());

		// Compute signed speed: projection of velocity on forward direction
		const speed = vel.dot(forward); // positive = forward, negative = backward
		const speedMPH = speed * 2.23693629; // convert to mph for mps
		_VEHICLE_SPEED = speedMPH;
		
		var breakingForce = 0;
		var engineForce = 0;
		//var maxEngineForce = 2000;
		var maxBreakingForce = 100;
		
		var steeringIncrement = .04;
		var steeringClamp = .5;
		if (InputManager.actions[this.playerId].acceleration || (this.playerId==1 && InputManager.actions[0].moveForward ) ) {
			if (speed < -1)
				breakingForce = maxBreakingForce;
			else engineForce = this.maxEngineForce;
		}
		if (InputManager.actions[this.playerId].braking || (this.playerId==1 && InputManager.actions[0].moveBack )) {
			if (speed > 1)
				breakingForce = maxBreakingForce;
			else engineForce = -this.maxEngineForce / 2;
		}
		if (InputManager.actions[this.playerId].left || (this.playerId==1 && InputManager.actions[0].moveLeft )) {
			if (this.vehicleSteering < steeringClamp)
				this.vehicleSteering += steeringIncrement;
		}
		else {
			if (InputManager.actions[this.playerId].right || (this.playerId==1 && InputManager.actions[0].moveRight )) {
				if (this.vehicleSteering > -steeringClamp)
					this.vehicleSteering -= steeringIncrement;
			}
			else {
				if (this.vehicleSteering < -steeringIncrement)
					this.vehicleSteering += steeringIncrement;
				else {
					if (this.vehicleSteering > steeringIncrement)
						this.vehicleSteering -= steeringIncrement;
					else {
						this.vehicleSteering = 0;
					}
				}
			}
		}
		if(InputManager.actions[this.playerId].reset || (this.playerId == 1 && InputManager.actions[0].print)){
			this.resetPosition(this.mesh.position.x,this.mesh.position.y+.5,this.mesh.position.z);
		}
		this.vehicle.applyEngineForce(engineForce, BACK_LEFT);
		this.vehicle.applyEngineForce(engineForce, BACK_RIGHT);
		
		this.vehicle.setBrake(breakingForce / 2, FRONT_LEFT);
		this.vehicle.setBrake(breakingForce / 2, FRONT_RIGHT);
		this.vehicle.setBrake(breakingForce, BACK_LEFT);
		this.vehicle.setBrake(breakingForce, BACK_RIGHT);
		
		this.vehicle.setSteeringValue(this.vehicleSteering, FRONT_LEFT);
		this.vehicle.setSteeringValue(this.vehicleSteering, FRONT_RIGHT);
	}
	setVehiclePosition(x, y, z) {
		const transform = new Ammo.btTransform();
		transform.setIdentity();
		transform.setOrigin(new Ammo.btVector3(x, y, z));

		// Optionally keep current rotation
		transform.setRotation(this.rigidBody.getWorldTransform().getRotation());

		this.rigidBody.setWorldTransform(transform);
		this.rigidBody.getMotionState().setWorldTransform(transform);

		// Reset velocity
		this.rigidBody.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
		this.rigidBody.setAngularVelocity(new Ammo.btVector3(0, 0, 0));

		// Update vehicle internal state
		this.vehicle.resetSuspension();
	}
	rotateVehicleY(angle) {
		// Get chassis transform
		const transform = this.vehicle.getChassisWorldTransform();
		const rotation = transform.getRotation(); // Ammo.btQuaternion

		// Convert to THREE quaternion
		const threeQuat = new THREE.Quaternion(rotation.x(), rotation.y(), rotation.z(), rotation.w());

		// Create additional rotation
		const extraRot = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);

		// Multiply quaternions
		threeQuat.multiply(extraRot);

		// Apply back to Ammo
		transform.setRotation(new Ammo.btQuaternion(threeQuat.x, threeQuat.y, threeQuat.z, threeQuat.w));
		this.rigidBody.setWorldTransform(transform);
		this.rigidBody.getMotionState().setWorldTransform(transform);
	}
	synchronize(){
		this.applyForces();
		var tm, p, q, i;
		var n = this.vehicle.getNumWheels();
		for (i = 0; i < n; i++) {
			this.vehicle.updateWheelTransform(i, true);
			tm = this.vehicle.getWheelTransformWS(i);
			p = tm.getOrigin();
			q = tm.getRotation();
			this.wheelMeshes[i].position.set(p.x(), p.y(), p.z());
			this.wheelMeshes[i].quaternion.set(q.x(), q.y(), q.z(), q.w());
			this.wheelModels[i].position.set(p.x(), p.y(), p.z());
			this.wheelModels[i].quaternion.set(q.x(), q.y(), q.z(), q.w());
		}

		tm = this.vehicle.getChassisWorldTransform();
		p = tm.getOrigin();
		q = tm.getRotation();
		this.mesh.position.set(p.x(), p.y(), p.z());
		this.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
		this.bodyModel.position.set(p.x(), p.y(), p.z());
		this.bodyModel.quaternion.set(q.x(), q.y(), q.z(), q.w());
				
		this.setCamera();
		
		if( p.y()<-50)
			this.resetPosition(this.defaultPosition.x,this.defaultPosition.y,this.defaultPosition.z);
	}
	setCamera(){
		// Get world position and orientation of chassis
		const worldPosition = new THREE.Vector3();
		this.mesh.getWorldPosition(worldPosition);

		const worldQuaternion = new THREE.Quaternion();
		this.mesh.getWorldQuaternion(worldQuaternion);

		// Desired camera position behind/above the vehicle
		const cameraOffset = this.offset.clone().applyQuaternion(worldQuaternion);
		const desiredCameraPosition = worldPosition.clone().add(cameraOffset);

		// Smooth the camera position
		sceneManager.camera[this.playerId].position.lerp(desiredCameraPosition, 0.05);

		// Desired point to look at (ahead of vehicle)
		const lookAtOffset = new THREE.Vector3(0, 2, 10).applyQuaternion(worldQuaternion);
		const desiredLookAtPosition = worldPosition.clone().add(lookAtOffset);

		// Create a persistent vector to store smoothed lookAt
		if (!this._smoothedLookAt) {
			this._smoothedLookAt = desiredLookAtPosition.clone(); // first frame
		}
		this._smoothedLookAt.lerp(desiredLookAtPosition, 0.05);

		// Point the camera at the smoothed target
		sceneManager.camera[this.playerId].lookAt(this._smoothedLookAt);
	}
}
class FlyingVehicle extends PhysicsVehicle{
	constructor(model, shape,mesh,mass, pos,playerId){
		super(model, shape,mesh,mass, pos,playerId);
		this.flying = true;
		this.rigidBody.setDamping(.2, .7); // aid drag force: linear damping, angular damping 
	}
	applyForces(){
		if(this.flying)
		{
			var fa = 4.0;
			var forward = this.getForwardVector();
			var sideways = this.getSidewaysVector();
			var up = this.getUpVector();
			
			if (InputManager.actions[this.playerId].acceleration) {
				this.rigidBody.applyCentralForce(new Ammo.btVector3(forward.x*fa,forward.y*fa,forward.z*fa));
			}
			if (InputManager.actions[this.playerId].braking) {
				this.rigidBody.applyCentralForce(new Ammo.btVector3(-forward.x*fa,-forward.y*fa,-forward.z*fa));
			}
			var ta = 1;
			if (InputManager.actions[this.playerId].up||InputManager.actions[this.playerId].moveForward) 
				this.rigidBody.applyTorque(new Ammo.btVector3(-sideways.x*ta, -sideways.y*ta, -sideways.z*ta));
			if (InputManager.actions[this.playerId].down||InputManager.actions[this.playerId].moveBack) 
				this.rigidBody.applyTorque(new Ammo.btVector3(sideways.x*ta, sideways.y*ta, sideways.z*ta));
			
			
			if (InputManager.actions[this.playerId].left) 
				this.rigidBody.applyTorque(new Ammo.btVector3(up.x*ta, up.y*ta, up.z*ta));
			if (InputManager.actions[this.playerId].right) 
				this.rigidBody.applyTorque(new Ammo.btVector3(-up.x*ta, -up.y*ta, -up.z*ta));
			
			// Roll
			if (InputManager.actions[this.playerId].moveLeft)
			{
				this.rigidBody.applyTorque(new Ammo.btVector3(-forward.x*ta, -forward.y*ta, -forward.z*ta));
			}
			if (InputManager.actions[this.playerId].moveRight) 
			{
				this.rigidBody.applyTorque(new Ammo.btVector3(forward.x*ta, forward.y*ta, forward.z*ta));
			}

			
			if(Math.abs(this.vehicle.getWheelInfo(0).m_deltaRotation) > .1 ||
				 Math.abs(this.vehicle.getWheelInfo(1).m_deltaRotation) > .1 ||
				 Math.abs(this.vehicle.getWheelInfo(2).m_deltaRotation) > .1 ||
				 Math.abs(this.vehicle.getWheelInfo(3).m_deltaRotation) > .1
				 )
				this.flying = false;
			//Ammo.destroy(torque);

			this.rigidBody.setGravity(new Ammo.btVector3(0, Math.sin(sceneManager.time*5)/2, 0));
		}
		
		else {						
			super.applyForces();
			this.rigidBody.setGravity( new Ammo.btVector3( 0, -9.82, 0 ) );
			this.rigidBody.setDamping(.01, .01); // aid drag force: linear damping, angular damping 
		}
	}
	getForwardVector() {
		const worldPosition = new THREE.Vector3();
		this.mesh.getWorldPosition(worldPosition);

		const worldQuaternion = new THREE.Quaternion();
		this.mesh.getWorldQuaternion(worldQuaternion);

		return new THREE.Vector3(0, 0, 1000).applyQuaternion(worldQuaternion);
	}
	getSidewaysVector() {
		const worldPosition = new THREE.Vector3();
		this.mesh.getWorldPosition(worldPosition);

		const worldQuaternion = new THREE.Quaternion();
		this.mesh.getWorldQuaternion(worldQuaternion);

		return new THREE.Vector3(1000, 0, 0).applyQuaternion(worldQuaternion);
	}
	getUpVector() {
		const worldPosition = new THREE.Vector3();
		this.mesh.getWorldPosition(worldPosition);

		const worldQuaternion = new THREE.Quaternion();
		this.mesh.getWorldQuaternion(worldQuaternion);

		return new THREE.Vector3(0, 1000, 0).applyQuaternion(worldQuaternion);
	}
}

export { PhysicsWorld, PhysicsCube, PhysicsBox, PhysicsBall, PhysicsMesh, MovingBox, PhysicsVehicle, FlyingVehicle, Star };