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
        this.rightFin = new MyTriangleSmall(scene);
        this.leftFin = new MyTriangleSmall(scene);
        this.swimmerFin = new MyTriangleBig(scene);
        this.initBuffers();
    }
}