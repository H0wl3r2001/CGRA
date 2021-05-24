import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';

export class MyMovingFish extends MyMovingObject
{
    constructor(scene, slices, stacks, speedFactor)
    {
        super(scene, slices, stacks, speedFactor);
        this.model = new MyFish(scene, slices, stacks);
    }

    init_pos(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.ang = 0;
    }

    display()
    {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.ang, 0, 1, 0);
        this.model.display();
        this.scene.popMatrix();
    }

    animation()
    {
        this.model.animation(this.speedFactor);
    }
}