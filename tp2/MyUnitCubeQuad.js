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
		this.initBuffers(scene);
    }

    display(scene){
        this.square = new MyQuad(scene);

        //Positive y face
        scene.pushMatrix();
        scene.translate(0, 0.5, 0);
        this.square.display();
        scene.popMatrix();

        //Negative y face
        scene.pushMatrix();
        scene.translate(0, -0.5, 0);
        scene.rotate(Math.PI, 1, 0, 0);
        this.square.display();
        scene.popMatrix();
        
        //Negative x face
        scene.pushMatrix();
        scene.translate(-0.5,0,0);
        scene.rotate(Math.PI/2,0,0,1);
        this.square.display();
        scene.popMatrix();

        //Positive x face
        scene.pushMatrix();
        scene.translate(0.5,0,0);
        scene.rotate(-Math.PI/2,0,0,1);
        this.square.display();
        scene.popMatrix();

        //Negative z face
        scene.pushMatrix();
        scene.translate(0, 0, -0.5);
        scene.rotate(-Math.PI/2,1,0,0);
        this.square.display();
        scene.popMatrix();

        //Positive z face
        scene.pushMatrix();
        scene.translate(0, 0, 0.5);
        scene.rotate(Math.PI/2,1,0,0);
        this.square.display();
        scene.popMatrix();
    }
}