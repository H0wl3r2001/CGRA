import {CGFobject} from '../lib/CGF.js';
import {MyMovingObject} from './MyMovingObject.js';
import {MySphere} from './MySphere.js';

export class MyFish extends MyMovingObject
{
    constructor(scene, slices, stacks)
    {
        super(scene, slices, stacks);
        this.initBuffers();
    }
}