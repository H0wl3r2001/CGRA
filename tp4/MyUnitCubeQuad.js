import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {    MyQuad  } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject{
    constructor(scene, texSide, texBottom, texTop){
		    super(scene);
        this.square = new MyQuad(scene);
        this.texSide = texSide;
        this.texBottom = texBottom;
        this.texTop = texTop;
        this.initMaterials();
    }

    initMaterials()
    {
        this.sideMat= new CGFappearance(this.scene);
        this.sideMat.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.sideMat.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.sideMat.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.sideMat.setShininess(1.0);
        this.sideMat.setTexture(this.texSide);
        //this.sideMat.setTextureWrap('REPEAT', 'REPEAT');

        this.topMat= new CGFappearance(this.scene);
        this.topMat.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.topMat.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.topMat.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.topMat.setShininess(1.0);
        this.topMat.setTexture(this.texTop);
        //this.topMat.setTextureWrap('REPEAT', 'REPEAT');

        this.bottomMat= new CGFappearance(this.scene);
        this.bottomMat.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.bottomMat.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.bottomMat.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.bottomMat.setShininess(1.0);
        this.bottomMat.setTexture(this.texBottom);
        //this.bottomMat.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    display()
    {
      this.scene.pushMatrix();
      this.sideMat.apply();
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.scene.translate(0, 0, 0.5);
      this.square.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.5);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.sideMat.apply();
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.square.display();
      this.scene.popMatrix();
      
      //top
      this.scene.pushMatrix();
      this.scene.translate(0, 0.5, 0);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.topMat.apply();
      this.square.display();
      this.scene.popMatrix();
      
      //bottom
      this.scene.pushMatrix();
      this.scene.translate(0, -0.5, 0);
      this.scene.rotate(Math.PI/2, 1, 0, 0);
      this.bottomMat.apply();
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.square.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(0.5, 0, 0);
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.sideMat.apply();
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.square.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-0.5, 0, 0);
      this.scene.rotate(-Math.PI/2, 0, 1, 0);
      this.sideMat.apply();
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.square.display();
      this.scene.popMatrix();
    }

    updateTexCoords(coords) {
      this.square.updateTexCoords(coords);
    }
}