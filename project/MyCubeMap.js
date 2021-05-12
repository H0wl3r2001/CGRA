import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {    MyQuad  } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject{
    constructor(scene, textures){
		    super(scene);
        this.square = new MyQuad(scene);
        this.texBack = textures[0];
        this.texFront = textures[2];
        this.texLeft = textures[3];
        this.texRight = textures[4];
        this.texBottom = textures[1];
        this.texTop = textures[5];
        this.initMaterials();
    }

    initMaterials()
    {
        this.frontMat= new CGFappearance(this.scene);
        this.frontMat.setAmbient(0,0,0,0);
        this.frontMat.setDiffuse(0,0,0,0);
        this.frontMat.setSpecular(0,0,0,0);
        this.frontMat.setEmission(10,10,10,10);
        this.frontMat.setShininess(10);
        this.frontMat.loadTexture(this.texFront);
        this.frontMat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.backMat= new CGFappearance(this.scene);
        this.backMat.setAmbient(0,0,0,0);
        this.backMat.setDiffuse(0,0,0,0);
        this.backMat.setSpecular(0,0,0,0);
        this.backMat.setEmission(10,10,10,10);
        this.backMat.setShininess(10);
        this.backMat.loadTexture(this.texBack);
        this.backMat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.rightMat= new CGFappearance(this.scene);
        this.rightMat.setAmbient(0,0,0,0);
        this.rightMat.setDiffuse(0,0,0,0);
        this.rightMat.setSpecular(0,0,0,0);
        this.rightMat.setEmission(10,10,10,10);
        this.rightMat.setShininess(10);
        this.rightMat.loadTexture(this.texRight);
        this.rightMat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.leftMat= new CGFappearance(this.scene);
        this.leftMat.setAmbient(0,0,0,0);
        this.leftMat.setDiffuse(0,0,0,0);
        this.leftMat.setSpecular(0,0,0,0);
        this.leftMat.setEmission(10,10,10,10);
        this.leftMat.setShininess(10);
        this.leftMat.loadTexture(this.texLeft);
        this.leftMat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.topMat= new CGFappearance(this.scene);
        this.topMat.setAmbient(0,0,0,0);
        this.topMat.setDiffuse(0,0,0,0);
        this.topMat.setSpecular(0,0,0,0);
        this.topMat.setEmission(10,10,10,10);
        this.topMat.setShininess(10);
        this.topMat.loadTexture(this.texTop);
        this.topMat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.bottomMat= new CGFappearance(this.scene);
        this.bottomMat.setAmbient(0,0,0,0);
        this.bottomMat.setDiffuse(0,0,0,0);
        this.bottomMat.setSpecular(0,0,0,0);
        this.bottomMat.setEmission(10,10,10,10);
        this.bottomMat.setShininess(10);
        this.bottomMat.loadTexture(this.texBottom);
        this.bottomMat.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }
    
    display()
    {
      this.scene.pushMatrix();

      this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
      this.scene.scale(500,500,500);

      //front
      this.frontMat.apply();
      this.scene.pushMatrix();
      this.scene.translate(0, 0, 0.5);
      this.square.display();
      this.scene.popMatrix();

      //back
      this.backMat.apply();
      this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.5);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.square.display();
      this.scene.popMatrix();

      //top
      this.topMat.apply();  
      this.scene.pushMatrix();
      this.scene.translate(0, 0.5, 0);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.square.display();
      this.scene.popMatrix();

      //bottom
      this.bottomMat.apply();
      this.scene.pushMatrix();
      this.scene.translate(0, -0.5, 0);
      this.scene.rotate(Math.PI/2, 1, 0, 0);
      this.square.display();
      this.scene.popMatrix();

      //right
      this.rightMat.apply();
      this.scene.pushMatrix();
      this.scene.translate(0.5, 0, 0);
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.square.display();
      this.scene.popMatrix();

      //left
      this.leftMat.apply();
      this.scene.pushMatrix();
      this.scene.translate(-0.5, 0, 0);
      this.scene.rotate(-Math.PI/2, 0, 1, 0);
      this.square.display();
      this.scene.popMatrix();

      this.scene.popMatrix();
    }

    updateTex(lista)
    {
      this.backMat.loadTexture(lista[0]);
      this.bottomMat.loadTexture(lista[1]);
      this.frontMat.loadTexture(lista[2]);
      this.leftMat.loadTexture(lista[3]);
      this.rightMat.loadTexture(lista[4]);
      this.topMat.loadTexture(lista[5]);
    }

    updateTexCoords(coords) {
      this.square.updateTexCoords(coords);
    }
}