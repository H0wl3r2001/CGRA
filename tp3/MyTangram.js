import {CGFobject, CGFscene, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
/**
 * MyTangram - Bunny
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject{
    constructor(scene) {
		super(scene);
        this.initMaterials(scene);
        
        this.diamond = new MyDiamond(scene);               //head        
        this.parallelogram = new MyParallelogram(scene);   //left ear  
        this.triangle = new MyTriangle(scene);             //right ear
	}

    initMaterials(scene) {
        //All are specular materials

        // Green Specular
        this.greenSpec = new CGFappearance(scene);
        this.greenSpec.setAmbient(0, 0, 0, 1.0);
        this.greenSpec.setDiffuse(0, 0, 0, 1.0);
        this.greenSpec.setSpecular(0, 1, 0, 1.0);
        this.greenSpec.setShininess(2.0);

        // Yellow Specular
        this.yellowSpec = new CGFappearance(scene);
        this.yellowSpec.setAmbient(0, 0, 0, 1.0);
        this.yellowSpec.setDiffuse(0, 0, 0, 1.0);
        this.yellowSpec.setSpecular(1, 1, 0, 1.0);
        this.yellowSpec.setShininess(2.0);

        // Pink Specular
        this.pinkSpec = new CGFappearance(scene);
        this.pinkSpec.setAmbient(0, 0, 0, 1.0);
        this.pinkSpec.setDiffuse(0, 0, 0, 1.0);
        this.pinkSpec.setSpecular(1, 0.6, 0.8, 1.0);
        this.pinkSpec.setShininess(2.0);

        // Purple Specular
        this.purpleSpec = new CGFappearance(scene);
        this.purpleSpec.setAmbient(0, 0, 0, 1.0);
        this.purpleSpec.setDiffuse(0, 0, 0, 1.0);
        this.purpleSpec.setSpecular(0.5, 0, 0.5, 1.0);
        this.purpleSpec.setShininess(2.0);

        // Red Specular
        this.redSpec = new CGFappearance(scene);
        this.redSpec.setAmbient(0, 0, 0, 1.0);
        this.redSpec.setDiffuse(0, 0, 0, 1.0);
        this.redSpec.setSpecular(1, 0, 0, 1.0);
        this.redSpec.setShininess(2.0);

        // Orange Specular
        this.orangeSpec = new CGFappearance(scene);
        this.orangeSpec.setAmbient(0, 0, 0, 1.0);
        this.orangeSpec.setDiffuse(0, 0, 0, 1.0);
        this.orangeSpec.setSpecular(1, 0.6, 0, 1.0);
        this.orangeSpec.setShininess(2.0);

        // Blue Specular
        this.blueSpec = new CGFappearance(scene);
        this.blueSpec.setAmbient(0, 0, 0, 1.0);
        this.blueSpec.setDiffuse(0, 0, 0, 1.0);
        this.blueSpec.setSpecular(0, 0, 1, 1.0);
        this.blueSpec.setShininess(2.0);
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
        
        this.greenSpec.apply();

        this.diamond.display();

        this.scene.popMatrix();

        //left ear - parallelogram
        this.scene.pushMatrix();

        this.scene.translate(0,2*Math.SQRT2,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.rotate(Math.PI/4,0,0,1);

        this.yellowSpec.apply();
        this.parallelogram.display();

        this.scene.popMatrix();

        //right ear - triangle
        this.scene.pushMatrix();

        this.scene.translate(2*Math.SQRT2/3,8*Math.SQRT2/3,0);
        this.scene.scale(2/3,2/3,2/3);
        this.scene.rotate(-3*Math.PI/4,0,0,1);

        this.pinkSpec.apply();
        this.triangle.display();
        
        this.scene.popMatrix();

        //arm - 1st small triangle
        this.scene.pushMatrix();
        
        this.scene.scale(0.5,0.5,1);
        this.scene.translate(0,0.9,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        
        this.purpleSpec.apply();
        this.triangle.display();

        this.scene.popMatrix();

        //arm - 2nd small triangle
        this.scene.pushMatrix();
        
        this.scene.scale(0.5,0.5,1);
        this.scene.translate(-2,-1.1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);

        this.redSpec.apply();
        this.triangle.display();

        this.scene.popMatrix();

        //Leg 1 - 1st big triangle
        this.scene.pushMatrix();
        
        this.scene.translate(0, -1/3*Math.SQRT2, 0);
        this.scene.rotate(-Math.PI/2,0,0,1);

        this.orangeSpec.apply();
        this.triangle.display();

        this.scene.popMatrix();

        //Leg 2 - 2nd big triangle
        this.scene.pushMatrix();
        
        this.scene.translate(0.45*Math.SQRT2, -1.3*Math.SQRT2,0);
        this.scene.rotate(-3/4*Math.PI,0,0,1);

        this.blueSpec.apply();
        this.triangle.display();

        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.triangle.enableNormalViz();
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
    }

    disableNormalViz(){
        this.triangle.disableNormalViz();
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
    }
}