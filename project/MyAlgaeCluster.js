import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import {MyPyramid} from './MyPyramid.js';


export class MyAlgaeCluster extends CGFobject
{
    constructor(scene, numClust)
    {
        super(scene);
        this.numClust = numClust;
        this.clustCenter = [];
        this.randIndices = [];
        this.randOffsets = [];
        this.algae = new MyPyramid(scene, 4, 1);
        this.initShaders();
        this.initClusts();
    }

    initShaders()
    {
        this.green1 = new CGFappearance(this.scene);
        this.green1.setAmbient(0.53, 0.83, 0.26, 1);
        this.green1.setDiffuse(0.53, 0.83, 0.26, 1);
        this.green1.setSpecular(0.53, 0.83, 0.26, 1);
        this.green1.setShininess(120);

        this.green2 = new CGFappearance(this.scene);
        this.green2.setAmbient(0.72, 0.97, 0.5, 1);
        this.green2.setDiffuse(0.72, 0.97, 0.5, 1);
        this.green2.setSpecular(0.72, 0.97, 0.5, 1);
        this.green2.setShininess(120);

        this.green3 = new CGFappearance(this.scene);
        this.green3.setAmbient(0.3, 0.58, 0.13, 1);
        this.green3.setDiffuse(0.3, 0.58, 0.13, 1);
        this.green3.setSpecular(0.3, 0.58, 0.13, 1);
        this.green3.setShininess(120);

        this.appearences = [this.green1, this.green2, this.green3];
        
        for(let i = 0; i < this.numClust * 4; i++)
        {
            this.randIndices.push(Math.floor(Math.random()*3));
        }
    }

    initClusts()
    {
        for(let i = 0; i < this.numClust; i++)
        {
            this.clustCenter.push([(Math.random() * 50) - 25, (Math.random() * 50) - 25]);
        }
        for(let i = 0; i < this.numClust*4; i++)
        {
            this.randOffsets.push([Math.floor(Math.random()*3),Math.floor(Math.random()*3)]);
        }
    }

    display()
    {
        for(let i = 0; i < this.numClust; i++)
        {
            this.scene.pushMatrix();
            this.scene.translate(this.clustCenter[i][0], 0.5, this.clustCenter[i][1]);
            for(let k = 0; k < 4; k++)
            {   
                this.appearences[this.randIndices[i*4 + k]].apply();
                this.scene.pushMatrix();
                this.scene.translate(this.randOffsets[i*4 + k][0], 0, this.randOffsets[i*4 + k][1]);
                this.scene.scale(this.randOffsets[i*4 + k][1]*0.1, this.randOffsets[i*4 + k][1]*1, this.randOffsets[i*4 + k][0]*0.1);
                this.algae.display();
                this.scene.popMatrix();
            }
            this.scene.popMatrix();
            
        }
    }
}