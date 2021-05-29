import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';
import { CGFappearance } from '../lib/CGF.js';

export class MyMovingFish extends MyMovingObject
{
    constructor(scene)
    {
        super(scene, 4, 1);
        this.model = new MyFish(scene, 16, 8);
        this.rockInMouth = []; //0 will be the object; 1 will be the position; 2 will be the scale; 3 will be the original index of the rockSet.
    }

    init_pos(){
        this.originalPos = [0,0,0];
        this.x = originalPos[0];
        this.y = originalPos[1];
        this.z = originalPos[2];
        this.ang = 0;
    }

    update(speedFactor, deltaTime){
        super.update(speedFactor, deltaTime);
        if(this.y < 0.0 || this.y > 5.0){   //for some reason I'm not entirely sure of, == 0.0/5.0 does not work
            this.vY = 0;
        }
        //if we can move on the Y axis
        if(this.y + this.vY*speedFactor*deltaTime > 0.0 && this.y + this.vY*speedFactor*deltaTime < 5.0)
            this.y += this.vY*speedFactor*deltaTime;
    }

    display()
    {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.ang, 0, 1, 0);
        this.model.display();
        
        if(this.rockInMouth.length != 0)
        {
            this.rockMat = new CGFappearance(this.scene);
            this.rockMat.setAmbient(0.4, 0.4, 0.4, 1);
            this.rockMat.setDiffuse(0.4, 0.4, 0.4, 1);
            this.rockMat.setSpecular(0.4, 0.4, 0.4, 1);
            this.rockMat.setShininess(120);

            this.rockMat.apply();

            this.scene.pushMatrix();
            this.scene.translate(0,-1,0.75);
            this.scene.scale(this.rockInMouth[2][0], this.rockInMouth[2][1], this.rockInMouth[2][2])
            this.rockInMouth[0].display();
            /*
            while(this.rockInMouth.length > 0) //nem estando assim resolve
            {
                this.rockInMouth.pop();
            }
            */
            this.scene.popMatrix();
        }
        
        this.scene.popMatrix();
    }

    clean_mouth()
    {
        while(this.rockInMouth.length > 0)
        {
            this.rockInMouth.pop();
        }
    }

    //tentei ver se ao fazer outra função igual resolvia o problema, mas não
    dispose_rock()
    {
        while(this.rockInMouth.length > 0)
        {
            this.rockInMouth.pop();
        }
    }
    

    /**
     * checks if a rock is 1.5 units away from fish and if it is, puts that rock in the vector that will disply it in the mouth,
     * and also eliminates that same rock from all the arrays that have its info on the rockSet
     * @param {*} rockArray - The array that contains all the rocks from a set.
     * @param {*} rockPosArray - The array that contains all the rocks's initial positions from a set.
     * @param {*} rockScaleArray - The array that contains all the rocks's scales from a set.
     */
    collect(rockArray, rockPosArray, rockScaleArray, mouth)
    {
        for(let i = 0; i < rockArray.length; i++)
        {
            if(Math.pow(rockPosArray[i][0]-this.x, 2) + Math.pow(rockPosArray[i][2]-this.z, 2) <= Math.pow(1.5,2))
            {
                mouth.push(rockArray[i]);
                mouth.push(rockPosArray[i]);
                mouth.push(rockScaleArray[i]);
                rockArray.splice(i, 1);
                rockPosArray.splice(i, 1);
                rockScaleArray.splice(i, 1);
                break;
            }
        }
    }

    putOnNest(mouth, nestPos, nestRocks)
    {
        if(Math.pow(nestPos[0]-this.x, 2) + Math.pow(nestPos[2]-this.z, 2) <= Math.pow(2, 2))
        {
            nestRocks.push([mouth[0], mouth[2]]); //object and scale

            while(mouth.length > 0)
            {
                mouth.pop();
            }
        }    
    }

    animation(deltaTime)
    {
        this.model.animation(this.v * 5 * deltaTime, this.state);
    }
  
    /**
     * Must return a hypothetical rock in the fish's mouth to its original position.
     * @param {*} mouth - an array that contains the object, the original position, the scale and the original index of the rockSet.
     */
    reset(rockArray, rockPosArray, rockScaleArray, mouth){
        //reset movement variables
        super.reset([0,0,0], 0.0);

        //reset gameplay variables
        if(mouth.length != 0)
        {
            rockArray.push(mouth[0]);
            rockPosArray.push([mouth[1][0], mouth[1][1], mouth[1][2]]);
            rockScaleArray.push([mouth[2][0], mouth[2][1], mouth[2][2]]);
        }
        
        while(mouth.length > 0)
        {
            mouth.pop();
        }
        
        this.clean_mouth();
    }
}