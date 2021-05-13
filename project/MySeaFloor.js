import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import {    MyPlane  } from './MyPlane.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySeaFloor extends CGFobject{
    constructor(scene){
        super(scene);
        this.sandFloor = new MyPlane(scene, 50, 0, 1, 0 , 1);
        this.initShaders();
        this.initMaterials();
    }

    initShaders(){
        this.sandShader = new CGFshader(this.scene.gl, "shader/sandFloor.vert", "shader/sandFloor.frag");
    }

    initMaterials()
    {
        this.sandTex = new CGFtexture(this.scene, "images/sand.png");
        this.sandMap = new CGFtexture(this.scene, "images/sandMap.png");
        this.sandShader.setUniformsValues( { uSampler2: 1 } );
    }
    
    display()
    {
        this.scene.setActiveShader(this.sandShader);

        this.sandTex.bind(0);
        this.sandMap.bind(1);

        this.scene.pushMatrix();

        this.scene.scale(50,1,50);   // 1 unit effectively becomes 50 units
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.sandFloor.display();
        this.scene.popMatrix()
        this.scene.popMatrix();
    }

    updateTexCoords(coords) {
      this.square.updateTexCoords(coords);
    }
}