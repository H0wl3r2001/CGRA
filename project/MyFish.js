import {CGFobject} from '../lib/CGF.js';
import {MyMovingObject} from './MyMovingObject.js';
import {MySphere} from './MySphere.js';
import {MyTriangleBig} from './MyTriangleBig.js';
import {MyTriangleSmall} from './MyTriangleSmall.js';

export class MyFish extends MyMovingObject
{
    constructor(scene, slices, stacks)
    {
        super(scene, slices, stacks);
        this.body = new MySphere(scene, slices, stacks);
        this.eye1 = new MySphere(scene, slices, stacks);
        this.eye2 = new MySphere(scene, slices, stacks);
        this.rightFin = new MyTriangleSmall(scene);
        this.leftFin = new MyTriangleSmall(scene);
        this.topFin = new MyTriangleSmall(scene);
        this.swimmerFin = new MyTriangleBig(scene);
    }

    display()
    {
        //body (how to force required dimensions?)
        this.scene.pushMatrix();
        this.scene.scale(2,1,1);
        this.scene.translate(0,3,0);
        this.body.display();
        this.scene.popMatrix();


    }
}