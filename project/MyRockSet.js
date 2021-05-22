import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject{
    constructor(scene, rockNum){
        super(scene);
        this.rockNum = rockNum;
        this.rocks = [];
        this.rockPos = [];
        this.rockScale = [];
        this.initMaterials();
        this.initRocks();
    }

    initMaterials()
    {
        this.rockMat = new CGFappearance(this.scene);
        this.rockMat.setAmbient(0.4, 0.4, 0.4, 1);
        this.rockMat.setDiffuse(0.4, 0.4, 0.4, 1);
        this.rockMat.setSpecular(0.4, 0.4, 0.4, 1);
        this.rockMat.setShininess(120);
        // this.rockMat.loadTexture("./images/stone.jpg");
        // this.rockMat.setTextureWrap('REPEAT', 'REPEAT');
        // this.rockTex = new CGFtexture(this.scene, "./images/stone.jpg");
    }

    initRocks(){
        for(let i = 0; i < this.rockNum; i++){
            this.rocks.push(new MyRock(this.scene, 16, 8));
            this.rockPos.push([(Math.random() * 50) - 25, 0.7, (Math.random() * 50) - 25]);
            this.rockScale.push([Math.random() * 0.3 + 0.1, Math.random() * 0.3 + 0.1, Math.random() * 0.3 + 0.1]);
        }
    }
    
    display()
    {
        this.rockMat.apply();
        this.scene.pushMatrix();
        for(let i = 0; i < this.rocks.length; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.rockPos[i][0], this.rockPos[i][1], this.rockPos[i][2]);
            this.scene.scale(this.rockScale[i][0], this.rockScale[i][1], this.rockScale[i][2]);
            this.rocks[i].display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix(); 
    }
}