import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';

class Model {
	#loader;
	constructor(){
		// GLTF
		this.#loader = new GLTFLoader();
		this.model = null;
		// Physics
		this.geometry = null;
		this.material = null;
	}
	load(modelPath, onLoadCallback){
		this.#loader.load(
			modelPath,
			(gltf) => {				
				this.model = gltf.scene;			
				this.model.traverse((child) => {					
					if (child.isMesh) {						
						child.geometry.computeVertexNormals();
						child.material.side = THREE.DoubleSide; // sometimes helps
						child.castShadow = true;
						child.receiveShadow = true;
						// Generate Ammo shape (only from the first mesh you find)
						if (!this.collisionMesh) {
							this.geometry = child.geometry;
						}
					}
				});				
				if (onLoadCallback) 
					onLoadCallback(this.model); // notify when loaded
			},
			(xhr) => {
				console.log(`loaded ${modelPath}`);
			},
			(error) => {
				console.error('An error happened while loading the GLB', error);
			}
		);
	}
	rotate(x = 0, y = 0, z = 0) {
		if (this.model) {
			this.model.rotation.x += x;
			this.model.rotation.y += y;
			this.model.rotation.z += z;
		} else {
			console.warn("Model not yet loaded.");
		}
	}
	createConvexHullShape(){
		if (!this.model) {
			console.warn("Model not yet loaded.");
			return null;
		}
		const shape = new Ammo.btConvexHullShape();
		const tempBtVec3 = new Ammo.btVector3();
		this.model.traverse((child) => {
			if (child.isMesh) {
				
				// Clone and transform the geometry
				const geom = child.geometry.clone();
				child.updateWorldMatrix(true, false);
				geom.applyMatrix4(child.matrixWorld);

				const posAttr = geom.attributes.position;

				for (let i = 0; i < posAttr.count; i++) {
					const x = posAttr.getX(i);
					const y = posAttr.getY(i);
					const z = posAttr.getZ(i);
					tempBtVec3.setValue(x, y, z);
					shape.addPoint(tempBtVec3, true);
				}
			}
		});
		Ammo.destroy(tempBtVec3);
		return shape;
	}
	createTriangleMeshShape() {
		if (!this.model) {
			console.warn("Model not yet loaded.");
			return null;
		}
		const triangleMesh = new Ammo.btTriangleMesh();

		this.model.traverse((child) => {
			if (child.isMesh) {
				// Clone and transform the geometry
				const geom = child.geometry.clone();
				child.updateWorldMatrix(true, false);
				geom.applyMatrix4(child.matrixWorld);

				const posAttr = geom.attributes.position;
				const indexAttr = geom.index ? geom.index.array : null;

				for (let i = 0; i < (indexAttr ? indexAttr.length : posAttr.count); i += 3) {
					const i0 = indexAttr ? indexAttr[i] : i;
					const i1 = indexAttr ? indexAttr[i + 1] : i + 1;
					const i2 = indexAttr ? indexAttr[i + 2] : i + 2;

					const v0 = new Ammo.btVector3(
						posAttr.getX(i0),
						posAttr.getY(i0),
						posAttr.getZ(i0)
					);
					const v1 = new Ammo.btVector3(
						posAttr.getX(i1),
						posAttr.getY(i1),
						posAttr.getZ(i1)
					);
					const v2 = new Ammo.btVector3(
						posAttr.getX(i2),
						posAttr.getY(i2),
						posAttr.getZ(i2)
					);
					triangleMesh.addTriangle(v0, v1, v2, true);

					Ammo.destroy(v0);
					Ammo.destroy(v1);
					Ammo.destroy(v2);
				}
			}
		});

		return new Ammo.btBvhTriangleMeshShape(triangleMesh, true, true);
	}
	createConvexHullMesh() {
		if (!this.model) {
			console.warn("Model not loaded yet.");
			return null;
		}
		const points = [];

		this.model.traverse((child) => {
			if (child.isMesh) {
				// Clone the geometry so we don’t modify the original
				const geom = child.geometry.clone();

				// Apply object's world matrix (scale, rotation, position)
				child.updateWorldMatrix(true, false);
				geom.applyMatrix4(child.matrixWorld);

				const posAttr = geom.attributes.position;
				for (let i = 0; i < posAttr.count; i++) {
					points.push(new THREE.Vector3().fromBufferAttribute(posAttr, i));
				}
			}
		});

		if (points.length < 4) {
			console.warn("Not enough points to build convex hull.");
			return null;
		}

		const convexGeom = new ConvexGeometry(points);
		convexGeom.computeBoundingBox();

		const mesh = new THREE.Mesh(
			convexGeom,
			new THREE.MeshStandardMaterial({ color: 0xffff00, wireframe: true, transparent: true, opacity: 0.6 })
		);
		return mesh;
	}
	setColor(newColor, doubleSided = false){
		this.model.traverse((child) => {
			if (child.isMesh) {
				if(doubleSided)
					child.material = new THREE.MeshStandardMaterial({ color: newColor, side: THREE.DoubleSide});
				else
					child.material = new THREE.MeshStandardMaterial({ color: newColor});
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	}
}
export { Model }; 