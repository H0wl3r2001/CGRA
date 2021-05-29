import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';

export class MyAnimatedFish extends MyMovingObject
{
    constructor(scene, centre, duration, randomize) //Parâmetros do peixe: cor, rácio cabeça/corpo e textura(opcional)
    {
        super(scene, 4, 1);
        this.model = new MyFish(scene, 16, 8, randomize);
        this.init_pos(centre, duration);
    }

    init_pos(centre, duration){
        let radius = 5;
        this.originalPos = [centre[0] + radius, centre[1], centre[2]];
        this.x = centre[0] + radius;
        this.y = centre[1];
        this.z = centre[2];
        this.ang = 0;
        this.angIncrement = 2*Math.PI/duration;
        this.originalVel = this.angIncrement*radius;
        this.v = this.originalVel;
    }

    update(speedFactor, deltaTime){
        super.update(speedFactor, deltaTime);
        this.ang += this.angIncrement * deltaTime;
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
        this.model.animation(this.v / 5, this.state);
    }
  
    /**
     * Must return a hypothetical rock in the fish's mouth to its original position.
     * @param {*} mouth - an array that contains the object, the original position, the scale and the original index of the rockSet.
     */
    reset(){
        //reset movement variables
        super.reset(this.originalPos, this.originalVel);
        this.model.reset();
    }
}