import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {    MyQuad  } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject{
    constructor(scene, texRight, texLeft, texFront, texBack, texBottom, texTop){
		    super(scene);
        this.square = new MyQuad(scene);
        this.texBack = texBack;
        this.texFront = texFront;
        this.texLeft = texLeft;
        this.texRight = texRight;
        this.texBottom = texBottom;
        this.texTop = texTop;
        this.initMaterials();
    }

    initMaterials()
    {
        this.frontMat= new CGFappearance(this.scene);
        this.frontMat.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.frontMat.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.frontMat.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.frontMat.setShininess(1.0);
        this.frontMat.setTexture(this.texFront);
        //this.sideMat.setTextureWrap('REPEAT', 'REPEAT');

        this.backMat= new CGFappearance(this.scene);
        this.backMat.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.backMat.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.backMat.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.backMat.setShininess(1.0);
        this.backMat.setTexture(this.texBack);
        //this.sideMat.setTextureWrap('REPEAT', 'REPEAT');

        this.rightMat= new CGFappearance(this.scene);
        this.rightMat.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.rightMat.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.rightMat.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.rightMat.setShininess(1.0);
        this.rightMat.setTexture(this.texRight);
        //this.sideMat.setTextureWrap('REPEAT', 'REPEAT');

        this.leftMat= new CGFappearance(this.scene);
        this.leftMat.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.leftMat.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.leftMat.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.leftMat.setShininess(1.0);
        this.leftMat.setTexture(this.texLeft);
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
      this.scene.scale(50,50,50);
      this.scene.popMatrix();

      //front
      this.scene.pushMatrix();
      this.frontMat.apply();
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.scene.translate(0, 0, 0.5);
      this.square.display();
      this.scene.popMatrix();

      //back
      this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.5);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.backMat.apply();
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

      //right
      this.scene.pushMatrix();
      this.scene.translate(0.5, 0, 0);
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.rightMat.apply();
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.square.display();
      this.scene.popMatrix();

      //left
      this.scene.pushMatrix();
      this.scene.translate(-0.5, 0, 0);
      this.scene.rotate(-Math.PI/2, 0, 1, 0);
      this.leftMat.apply();
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.square.display();
      this.scene.popMatrix();

      //start drawing so as the center is the camera (HUGE DOUBTS)
      this.scene.pushMatrix();
      this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
      this.scene.popMatrix();
    }

    updateTexCoords(coords) {
      this.square.updateTexCoords(coords);
    }
}