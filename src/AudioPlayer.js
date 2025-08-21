import * as THREE from 'three';

class AudioPlayer {
	constructor(){
		// create an AudioListener and add it to the camera
		this.listener = new THREE.AudioListener();
		
		// create a global audio source
		this.sound = new THREE.Audio( this.listener );
		// load a sound and set it as the Audio object's buffer
		this.audioLoader = new THREE.AudioLoader();
	}
	loopSong(file){
		if (this.sound.isPlaying) {
			this.sound.stop();
		}
		this.audioLoader.load( file, (buffer) => {
			this.sound.setBuffer( buffer );
			this.sound.setLoop( true );
			this.sound.setVolume( 0.5 );
			console.log(`Looping audio: ${file}`)
			this.sound.play();
		});
	}
}
export { AudioPlayer }; // Export the class