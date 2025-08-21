import * as THREE from 'three';
import { Scene } from '/src/SceneManager.js';
import { Model } from '/src/Model.js';
class Credits extends Scene{
	load(){
		//Init
		this.song = 'music/Wildcat.ogg';
		numPlayers = 1;
		sceneManager.resetScene();
		console.log("Loading Credits");
		this.numStars = 1; //bypass level logic
		sceneManager.camera[0].position.z = 0;
		sceneManager.camera[0].position.y = 0;
		sceneManager.camera[0].position.x = 0;
		sceneManager.camera[0].lookAt(new THREE.Vector3(0,0,-1));
		
		this.setSkyColor(0x000 );

		this.showScrollingCredits([
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"Piper Rockelle's Wild Ride",
			"",
			"Art by Nick Karalexis",
			"Special Thanks to Anna Oop",
			"",
			"Programming:",
			"Narsgooth",
			"",
			"Graphics:",
			"THREE.js by Dr Doob",
			"",
			"Physics:",
			"Ammo.js by kripken",
			"",
			"AI:",
			"ChatGPT by OpenAI",
			"Gemini by Google",
			"",
			"3d Art:",
			"Blender",
			"Gimp",
			"",
			"Colors:",
			"HTML Color Mixer",
			"",
			"Music:",
			"RATATAT - Lex",
			"RATATAT - Breakaway",
			"RATATAT - Bilar",
			"RATATAT - Mandy",
			"RATATAT - Desert Eagle",
			"RATATAT - Bruleé",
			"RATATAT - El Pico",
			"RATATAT - Loud Pipes",
			"RATATAT - Kennedy",
			"RATATAT - Wildcat",
			"",
			"Vehicles:",
			"Jeep Wrangler",
			"Lamborghini Countach",
			"",
			"Audio:",
			"Ogg Vobris",
			"",
			"The End"
		]);
		
		setTimeout(() => {
			window.location.reload(false);

		}, 18500);
		
		
	}
	createCreditsTexture(lines) {
		const lineHeight = 50;
		const canvasHeight = lines.length * lineHeight + 200; // extra space
		const canvas = document.createElement('canvas');
		canvas.width = 1024;
		canvas.height = canvasHeight;

		const ctx = canvas.getContext('2d');

		// Background
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Text
		ctx.fillStyle = 'white';
		ctx.font = '38px Arial';
		ctx.textAlign = 'center';

		lines.forEach((line, i) => {
			ctx.fillText(line, canvas.width / 2, 100 + i * lineHeight);
		});

		const texture = new THREE.CanvasTexture(canvas);
		texture.needsUpdate = true;
		return texture;
	}

	showScrollingCredits(lines) {
			
		const texture = this.createCreditsTexture(lines);
		const material = new THREE.MeshBasicMaterial({ map: texture, transparent: false });
		const geometry = new THREE.PlaneGeometry(10, (texture.image.height / texture.image.width) * 10);
		const mesh = new THREE.Mesh(geometry, material);

		// Start below the camera
		mesh.position.set(0, -5, -7);
		

		sceneManager.scene.add(mesh);

		// Animate upward
		const scrollSpeed = 0.01; // adjust speed
		function animateCredits() {
			
			
			sceneManager.camera[0].position.z = 0;
			sceneManager.camera[0].position.y = 0;
			sceneManager.camera[0].position.x = 0;
			sceneManager.camera[0].lookAt(new THREE.Vector3(0,0,-1));
			
			mesh.position.y += scrollSpeed;
			//mesh.rotation.y += scrollSpeed;
			if (mesh.position.y < 200) {
				requestAnimationFrame(animateCredits);
			} else {
				sceneManager.scene.remove(mesh);
				geometry.dispose();
				material.map.dispose();
				material.dispose();
			}
		}
		animateCredits();
	}
}
export{ Credits };