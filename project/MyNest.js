import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import {   MyCylinder  } from './MyCylinder.js';
import {    MySphere    } from './MySphere.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject{
    constructor(scene){
        super(scene);
        this.nest = new MySphere(this.scene, 16, 8);
        this.nestPos = [];
        this.nestRocks = [];
        this.nestRockPos = [];
        this.nestShader = new CGFshader(this.scene.gl, "shader/nestShader.vert", "shader/nestShader.frag");
        this.initMaterials();
        this.initPos();
    }

    initPos()
    {
        this.nestPos.push(-10,0.8,5);
        
        
        for(let i = 0; i < 10; i++)
        {
            this.nestRockPos.push([Math.random(), Math.random(), Math.random()]);
        }
    }

    initMaterials()
    {
        this.woodTex = new CGFtexture(this.scene, "images/nest.jpg");

    }
    
    display()
    {
        this.scene.setActiveShader(this.nestShader);
        this.woodTex.bind(0);

        this.scene.pushMatrix();

        this.scene.translate(this.nestPos[0], this.nestPos[1], this.nestPos[2]);
        this.scene.scale(2,2,2);
        this.nest.display();

        this.scene.setActiveShader(this.scene.defaultShader);

        if(this.nestRocks.length != 0)
        {
            for(let i = 0; i < this.nestRocks.length; i++)
            {
                
                this.rockMat = new CGFappearance(this.scene);
                this.rockMat.setAmbient(0.4, 0.4, 0.4, 1);
                this.rockMat.setDiffuse(0.4, 0.4, 0.4, 1);
                this.rockMat.setSpecular(0.4, 0.4, 0.4, 1);
                this.rockMat.setShininess(120);
                
                this.rockMat.apply(); //côr não corresponde ao normal das pedras.
                
                this.scene.pushMatrix();
                this.scene.scale(this.nestRocks[i][1][0], this.nestRocks[i][1][1], this.nestRocks[i][1][2]);
                this.scene.translate(this.nestRockPos[i][0]-1, this.nestRockPos[i][1]-1, this.nestRockPos[i][2]-1);
                this.nestRocks[i][0].display();
                this.scene.popMatrix();
            }
        }

        this.scene.popMatrix();
    }

    updateTexCoords(coords) {
      this.square.updateTexCoords(coords);
    }
}