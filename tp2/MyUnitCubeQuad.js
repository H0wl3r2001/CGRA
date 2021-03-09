import {CGFobject, CGFscene} from '../lib/CGF.js';
import {    MyQuad  } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject{
    constructor(scene){
		super(scene);
    this.square = new MyQuad(scene);
    }

    display(){
        //Positive y face
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.square.display();
        this.scene.popMatrix();

        //Negative y face
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.square.display();
        this.scene.popMatrix();
        
        //Negative x face
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.square.display();
        this.scene.popMatrix();

        //Positive x face
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.square.display();
        this.scene.popMatrix();

        //Negative z face
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.square.display();
        this.scene.popMatrix();

        //Positive z face
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.square.display();
        this.scene.popMatrix();
    }
}