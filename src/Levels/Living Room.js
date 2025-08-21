import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { Scene } from '/src/SceneManager.js';
import { Model } from '/src/Model.js';

class UpdateObjects{
	constructor(chandelier,candleLight){
		
		this.chandelier = chandelier;
		this.candleLight = candleLight;
		
		this.rotationGroup = new THREE.Group();
		this.rotationGroup.position.copy(new THREE.Vector3(-1, 0, 0));
		this.rotationGroup.add(sceneManager.camera[0])
		
		sceneManager.objects.push(this); // Update Logic 
	}
	removeFromWorld()	{
	}
	synchronize(){
		var rotationFactor = 0.45;
		var rotationFactor2 = 0.45;
		this.rotationGroup.rotation.y=sceneManager.time*rotationFactor;
		this.rotationGroup.position.y=Math.sin(sceneManager.time*rotationFactor2)*1.7+4.25;
		sceneManager.camera[0].lookAt(-1,-Math.sin(sceneManager.time*rotationFactor2)*1.0+1.9,0);
		this.chandelier.rotate(0, -0.004, 0);
		var amplitude = .2;
		this.candleLight.intensity = Math.sin(sceneManager.time/2*50)*amplitude+amplitude+.5;
	}
}

class LivingRoom extends Scene{
	load(){
		// Init
		this.song = 'music/Lex.ogg';
		console.log("Loading Living Room");
		sceneManager.resetScene();
		this.numStars = 1; // Bypass Level Logic
		
		// Lighting
		var color = 0x8b008b;
		this.setSkyColor(0x000);
		sceneManager.scene.fog = new THREE.Fog(0x000011, 3, 17);
		
		const pointLight = new THREE.PointLight( 0xddFFFF, 25, 0);
		pointLight.shadow.mapSize.width = _SHADOW_RES;
		pointLight.shadow.mapSize.height = _SHADOW_RES;
		pointLight.shadow.bias = -0.00001; 
		pointLight.position.set( .4, 3.2, 0 );
		sceneManager.scene.add( pointLight );
		pointLight.castShadow = true;
		
		const pointLightFill = new THREE.PointLight( 0xddFFFF, 100, .9);
		pointLightFill.position.set( 0, 4.7, 0 );
		sceneManager.scene.add( pointLightFill );
		
		const pointLight3 = new THREE.PointLight( 0xbbffbb, 20, 0);
		pointLight3.shadow.mapSize.width = _SHADOW_RES;
		pointLight3.shadow.mapSize.height = _SHADOW_RES;
		pointLight3.shadow.bias = -0.00001; 
		pointLight3.position.set( 0, 4, 0 );
		sceneManager.scene.add( pointLight3 );
		pointLight3.castShadow = true;
		
		const pointLight4 = new THREE.PointLight( 0x000044, 10, 0);
		pointLight4.position.set( 5, 4, 0 );
		sceneManager.scene.add( pointLight4 );
		
		const pointLight2 = new THREE.PointLight( 0xffffaa, 5,20);
		pointLight2.position.set( 1.1991,1.32065, -0.028358);
		sceneManager.scene.add( pointLight2 );
		
		sceneManager.camera[0].position.z = 3.5;
		
		// Objects
		this.environment = new Model();
		this.environment.load('models/menu/living room.glb', (loadedModel) => {
			sceneManager.scene.add(loadedModel);
			this.environment.setColor(color);
		});
		
		this.chandelier = new Model();
		this.chandelier.load('models/menu/chandelier.glb', (loadedModel) => {
			sceneManager.scene.add(loadedModel);
			this.chandelier.setColor(color);
			var rot =new UpdateObjects(this.chandelier,pointLight2);
			console.log(pointLight2);
		});
		this.addMirror();
	}
	addMirror(){
		const geometry = new THREE.PlaneGeometry(1.8,3.2);
		const mirror = new Reflector(geometry, {
			clipBias: 0.003,
			textureWidth: 512,
			textureHeight: 512,
			color: 0x889999
		});
		mirror.position.y = 2.2;
		mirror.position.x = -4;
		mirror.position.z = 4;
		mirror.rotateY(-Math.PI ); 
		sceneManager.scene.add(mirror);
	}
}
export{ LivingRoom };