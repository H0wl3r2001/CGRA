import {CGFobject, CGFscene} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import {MyTriangle} from "./MyTriangle.js";
import {MyParallelogram} from "./MyParallelogram.js";
import {MyTriangleSmall} from "./MyTriangleSmall.js";
/**
 * MyTangram - Bunny
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject{
    constructor(scene) {
		super(scene);
		this.initBuffers(scene);
        this.diamond = new MyDiamond(scene);               //head        
        this.parallelogram = new MyParallelogram(scene);   //left ear  
        this.triangle = new MyTriangle(scene);             //right ear
        this.triangleSmall1 = new MyTriangleSmall(scene);  //Arm 1
        this.triangleSmall2 = new MyTriangleSmall(scene);  //Arm 2
        this.triangleBig1 = new MyTriangle(scene);      //Leg 1
        this.triangleBig2 = new MyTriangle(scene);      //Leg 2
	}

    display(){
        //diamond head
        this.scene.pushMatrix();

        var m_trans = [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        -Math.SQRT2/2, 3*Math.SQRT2/2,0,1
        ]

        this.scene.multMatrix(m_trans);

        var m_rot = 
        [
        Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0,0,
        -Math.sin(Math.PI/4), Math.cos(Math.PI/4),0,0,
        0,0,1,0,
        0,0,0,1
        ]

        this.scene.multMatrix(m_rot);
    
        this.diamond.display();

        this.scene.popMatrix();

        //left ear - parallelogram
        this.scene.pushMatrix();

        this.scene.translate(0,2*Math.SQRT2,0);

        this.scene.rotate(Math.PI,0,1,0);
        this.scene.rotate(Math.PI/4,0,0,1);

        this.parallelogram.display();

        this.scene.popMatrix();

        //right ear - triangle
        this.scene.pushMatrix();

        this.scene.translate(2*Math.SQRT2/3,8*Math.SQRT2/3,0);
        this.scene.scale(2/3,2/3,2/3);
        this.scene.rotate(-3*Math.PI/4,0,0,1);
        this.triangle.display();
        
        this.scene.popMatrix();

        //arm - 1st small triangle

        this.scene.pushMatrix();

        this.scene.translate(0,1-3*Math.SQRT2/8,0);
        this.scene.rotate(Math.PI/2,0,0,1);

        this.triangleSmall1.display();

        this.scene.popMatrix();

        //arm - 2nd small triangle
        this.scene.pushMatrix();

        this.scene.translate(-1,-3*Math.SQRT2/8,0);
        this.scene.rotate(-Math.PI/2,0,0,1);

        this.triangleSmall2.display();

        this.scene.popMatrix();

        //Leg 1 - 1st big triangle
        this.scene.pushMatrix();

        this.scene.translate(0, -1/3*Math.SQRT2, 0);
        this.scene.rotate(-Math.PI/2,0,0,1);

        this.triangleBig1.display();

        this.scene.popMatrix();

        //Leg 2 - 2nd big triangle
        this.scene.pushMatrix();
        
        this.scene.translate(0.45*Math.SQRT2, -1.3*Math.SQRT2,0);
        this.scene.rotate(-3/4*Math.PI,0,0,1);

        this.triangleBig2.display();

        this.scene.popMatrix();
    }
}