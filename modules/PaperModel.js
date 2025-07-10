// modules/PaperModel.js

import * as THREE from 'three';

class PaperModel {
    constructor(scene, width, height, segmentsX, segmentsY) {
        console.log("PaperModel.js: Constructor started.");
        console.log("PaperModel.js: THREE imported inside constructor:", THREE);
        console.log("PaperModel.js: THREE.Mesh is:", THREE.Mesh);

        this.scene = scene;
        this.width = width;
        this.height = height;
        this.segmentsX = segmentsX || 10;
        this.segmentsY = segmentsY || 10;

        this.mesh = this._createPaperMesh();
        console.log("PaperModel.js: Mesh created:", this.mesh);
        this.scene.add(this.mesh);
        console.log("PaperModel.js: Mesh added to scene.");

        console.log("PaperModel initialized with", this.segmentsX * this.segmentsY, "faces.");
    }

    _createPaperMesh() {
        console.log("PaperModel.js: _createPaperMesh started.");
        console.log("PaperModel.js: THREE inside _createPaperMesh:", THREE);
        const geometry = new THREE.PlaneGeometry(this.width, this.height, this.segmentsX, this.segmentsY);
        const material = new THREE.MeshStandardMaterial({
            // --- CHANGE THIS LINE TO RED ---
            color: 0xff0000, // This is RED!
            // --- END CHANGE ---
            side: THREE.DoubleSide,
            roughness: 0.8,
            metalness: 0.1
        });
        return new THREE.Mesh(geometry, material);
    }

    getMesh() {
        return this.mesh;
    }

    reset() {
        if (this.mesh) {
            this.scene.remove(this.mesh);
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
        }
        this.mesh = this._createPaperMesh();
        this.scene.add(this.mesh);
        console.log("Paper reset to unfolded state.");
    }
}

export default PaperModel;