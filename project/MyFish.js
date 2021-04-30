import {CGFobject} from '../lib/CGF.js';
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
    }

    initMaterials()
    {

    }

    display()
    {
        //body (how to force required dimensions?)
        this.scene.pushMatrix();
        this.scene.scale(1.5,1,1);
        this.scene.translate(0,3,0);
        this.body.display();
        this.scene.popMatrix();

        //left eye
        this.scene.pushMatrix();
        this.scene.translate(-1, 3, 0.7);
        this.scene.scale(0.2, 0.2, 0.2);
        this.eye1.display();
        this.scene.popMatrix();

        //right eye
        this.scene.pushMatrix();
        this.scene.translate(-1, 3, -0.7);
        this.scene.scale(0.2, 0.2, 0.2);
        this.eye2.display();
        this.scene.popMatrix();

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
        this.scene.translate(0, 2.5, 1.01);
        this.scene.rotate(3*Math.PI/4, 0,0,1);
        this.scene.rotate(Math.PI/6,1,0,0);
        this.scene.scale(0.5,0.5,0.5);
        this.leftFin.display();
        this.scene.popMatrix();

        //right fin
        this.scene.pushMatrix();
        this.scene.translate(0, 2.5, -1.01);
        this.scene.rotate(3*Math.PI/4, 0,0,1);
        this.scene.rotate(-Math.PI/6,1,0,0);
        this.scene.scale(0.5,0.5,0.5);
        this.rightFin.display();
        this.scene.popMatrix();
    }
}