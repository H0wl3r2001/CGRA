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
        this.initShaders();
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
}