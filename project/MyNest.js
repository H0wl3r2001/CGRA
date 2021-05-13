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
        this.nestShader = new CGFshader(this.scene.gl, "shader/nestShader.vert", "shader/nestShader.frag");
        this.initMaterials();
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

        this.scene.translate(10,1.2,0);
        this.nest.display();

        this.scene.popMatrix();
    }

    updateTexCoords(coords) {
      this.square.updateTexCoords(coords);
    }
}