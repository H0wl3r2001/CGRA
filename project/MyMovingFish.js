import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';

export class MyMovingFish extends MyMovingObject
{
    constructor(scene, slices, stacks, speedFactor)
    {
        super(scene, slices, stacks, speedFactor);
        this.model = new MyFish(scene, slices, stacks);
        this.rockInMouth = []; //0 will be the object; 1 will be the position; 2 will be the scale; 3 will be the original index of the rockSet.
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
        if(this.rockInMouth.length != 0)
        {
            
            this.scene.translate(0,0,2);
            this.scene.scale(this.rockInMouth[2][0], this.rockInMouth[2][1], this.rockInMouth[2][2])
            this.rockInMouth[0].display();
        }
        
        this.scene.popMatrix();
    }

    animation()
    {
        this.model.animation(this.v * 5, this.state);
    }
}