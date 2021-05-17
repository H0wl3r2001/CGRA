import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import {MyPyramid} from './MyPyramid.js';


export class MyAlgaeCluster extends CGFobject
{
    constructor(scene, numClust)
    {
        super(scene);
        this.numClust = numClust;
        this.shaders = [];
        this.clustCenter = [];
        this.algae = new MyPyramid(scene, 4, 1);
        this.initShaders();
        this.initClusts();
    }

    initShaders()
    {
        this.green1 = new CGFshader(this.scene.gl, "shader/algaeShaders/green1.vert", "shader/algaeShaders/green1.frag");
        this.green2 = new CGFshader(this.scene.gl, "shader/algaeShaders/green2.vert", "shader/algaeShaders/green2.frag");
        this.green3 = new CGFshader(this.scene.gl, "shader/algaeShaders/green3.vert", "shader/algaeShaders/green3.frag");
        this.shaders.push(this.green1);
        this.shaders.push(this.green2);
        this.shaders.push(this.green3);
    }

    initClusts()
    {
        for(let i = 0; i < this.numClust; i++)
        {
            this.clustCenter.push([(Math.random() * 50) - 25, 0.5, (Math.random() * 50) - 25]);
        }
    }

    display()
    {
        this.scene.pushMatrix();
        for(let i = 0; i < this.numClust; i++)
        {
            this.scene.translate(this.clustCenter[i][0], this.clustCenter[i][1], this.clustCenter[i][2]);
            for(let i = 0; i < 4; i++)
            {   
                this.scene.setActiveShader(this.shaders[Math.floor(Math.random()*3)]);
                this.scene.pushMatrix();
                this.scene.translate(Math.floor(Math.random()*4),0,Math.floor(Math.random()*4));
                this.scene.scale(0.1, 1, 0.1);
                this.algae.display();
                this.scene.popMatrix();
                this.scene.setActiveShader(this.scene.defaultShader);
            }   
        }
        this.scene.popMatrix();
    }
}