import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject{
    constructor(scene){
        super(scene);
        this.rocks = [
            new MyRock(this.scene, 20, 12, (Math.random() * 50) - 25, 1, (Math.random() * 50) - 25)
        ];
        this.initMaterials();
    }

    initMaterials()
    {
        this.rockMat = new CGFappearance(this.scene);
        this.rockMat.setAmbient(0.4, 0.4, 0.4, 1);
        this.rockMat.setDiffuse(0.4, 0.4, 0.4, 1);
        this.rockMat.setSpecular(0.4, 0.4, 0.4, 1);
        this.rockMat.setShininess(120);
        this.rockMat.loadTexture("./images/stone.jpg");
        this.rockMat.setTextureWrap('REPEAT', 'REPEAT');
        // this.rockTex = new CGFtexture(this.scene, "./images/stone.jpg");
    }
    
    display()
    {
        this.rockMat.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5,0);
        this.scene.scale(0.5, 0.2, 0.5);
        for(let i = 0; i < this.rocks.length; i++){
            this.rocks[i].display();
        }
        this.scene.popMatrix(); 
    }
}