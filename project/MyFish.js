import {CGFappearance, CGFobject, CGFshader} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import {MyTriangleSmall} from './MyTriangleSmall.js';

export class MyFish extends CGFobject
{
    constructor(scene, slices, stacks)
    {
        super(scene);
        this.body = new MySphere(scene, slices, stacks);
        this.eye1 = new MySphere(scene, slices, stacks);
        this.eye2 = new MySphere(scene, slices, stacks);
        this.rightFin = new MyTriangleSmall(scene);
        this.leftFin = new MyTriangleSmall(scene);
        this.topFin = new MyTriangleSmall(scene);
        this.swimmerFin = new MyTriangleSmall(scene);
        this.initMaterials();
        this.bodyShader = new CGFshader(this.scene.gl, "shader/fishBody.vert", "shader/fishBody.frag");
        this.eyeShader = new CGFshader(this.scene.gl, "shader/fishEye.vert", "shader/fishEye.frag")
        this.finShader = new CGFshader(this.scene.gl, "shader/fishFin.vert", "shader/fishFin.frag")
    }
    
    initMaterials()
    {
        this.scaleBody = new CGFappearance(this.scene);
        this.scaleBody.setAmbient(0.3, 0.3, 0.3, 1);
        this.scaleBody.setDiffuse(0.7, 0.7, 0.7, 1);
        this.scaleBody.setSpecular(0.0, 0.0, 0.0, 1);
        this.scaleBody.setShininess(120);
        this.scaleBody.loadTexture("images/scales.jpg");
        this.scaleBody.setTextureWrap('REPEAT', 'REPEAT');
    };
    
    display()
    {
        this.scene.setActiveShader(this.bodyShader);

        //body (how to force required dimensions?)
        this.scaleBody.apply();
        this.scene.pushMatrix();
        this.scene.scale(1.5,1,1);
        this.scene.translate(0,3,0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.body.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.eyeShader);

        //left eye
        this.scene.pushMatrix();
        this.scene.translate(-1, 3, 0.7);
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.rotate(2*Math.PI/3, 1, 0, 0);
        this.scene.rotate(Math.PI/3, 0, 1, 0);
        this.eye1.display();
        this.scene.popMatrix();

        //right eye
        this.scene.pushMatrix();
        this.scene.translate(-1, 3, -0.7);
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.rotate(-Math.PI/3, 1, 0, 0);
        this.scene.rotate(Math.PI/3, 0, 1, 0);
        this.eye2.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.finShader);

        //top fin
        this.scene.pushMatrix();
        this.scene.translate(0,4.35,0);
        this.scene.rotate(5*Math.PI/4, 0,0,1);
        this.scene.scale(0.5,0.5,0.5);
        this.topFin.display();
        this.scene.popMatrix();

        //back fin
        this.scene.pushMatrix();
        this.scene.translate(2.5,3,0);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.swimmerFin.display();
        this.scene.popMatrix();

        //left fin
        this.scene.pushMatrix();
        this.scene.translate(0, 2.5, 1.02);
        this.scene.rotate(3*Math.PI/4, 0,0,1);
        this.scene.rotate(Math.PI/6,1,1,0);
        this.scene.scale(0.5,0.5,0.5);
        this.leftFin.display();
        this.scene.popMatrix();

        //right fin
        this.scene.pushMatrix();
        this.scene.translate(0, 2.5, -1.02);
        this.scene.rotate(3*Math.PI/4, 0,0,1);
        this.scene.rotate(-Math.PI/6,1,1,0);
        this.scene.scale(0.5,0.5,0.5);
        this.rightFin.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}