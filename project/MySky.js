import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import {    MyQuad  } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySky extends CGFobject{
    constructor(scene){
        super(scene);
        this.sky = new MyQuad(this.scene);
        this.initShaders();
        this.initMaterials();
    }

    initShaders(){
        this.waterShader = new CGFshader(this.scene.gl, "shader/waterShader.vert", "shader/waterShader.frag");
        this.waterShader.setUniformsValues( { uSampler2 : 1 } );
    }

    initMaterials()
    {
        this.waterTex = new CGFtexture(this.scene, "images/pier.jpg");
        this.waterMap = new CGFtexture(this.scene, "images/distortionmap.png");
    }
    
    display()
    {
        this.scene.setActiveShader(this.waterShader);
        this.waterTex.bind(0);
        this.waterMap.bind(1);

        this.scene.pushMatrix();
        this.scene.translate(0,10,0);
        this.scene.scale(50,1,50);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.sky.display();
        this.scene.popMatrix();
    }

    updateTexCoords(coords) {
      this.square.updateTexCoords(coords);
    }
}