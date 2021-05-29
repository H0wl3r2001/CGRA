import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';

export class MyAnimatedFish extends MyMovingObject
{
    constructor(scene, centre, duration, updatePeriod) //Parâmetros do peixe: cor, rácio cabeça/corpo e textura(opcional)
    {
        super(scene, 4, 1);
        this.model = new MyFish(scene, 16, 8);
        this.init_pos(centre, duration, updatePeriod);
    }

    init_pos(centre, duration, updatePeriod){
        let radius = 5;
        this.x = centre[0] + radius;
        this.y = centre[1];
        this.z = centre[2];
        this.ang = 0;
        this.angIncrement = 2*Math.PI/duration / updatePeriod;
        this.v = this.angIncrement*radius;
    }

    update(speedFactor){
        super.update(speedFactor);
        if(this.y < 0.0 || this.y > 5.0){   //for some reason I'm not entirely sure of, == 0.0/5.0 does not work
            this.vY = 0;
        }
        //if we can move on the Y axis
        if(this.y + this.vY*speedFactor > 0.0 && this.y + this.vY*speedFactor < 5.0)
            this.y += this.vY*speedFactor;
        this.ang += this.angIncrement;
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
        this.model.animation(this.v * 5, this.state);
    }
  
    /**
     * Must return a hypothetical rock in the fish's mouth to its original position.
     * @param {*} mouth - an array that contains the object, the original position, the scale and the original index of the rockSet.
     */
    reset(){
        //reset movement variables
        super.reset();
    }
}