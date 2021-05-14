import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';

export class MyPillarSet extends CGFobject
{
    constructor(scene)
    {
        super(scene);
        this.pillar = new MyCylinder(scene, 6);
        this.initMat()
    }

    initMat()
    {
        this.woodPillar = new CGFappearance(this.scene);
        this.woodPillar.setAmbient(0.3, 0.3, 0.3, 1);
        this.woodPillar.setDiffuse(0.7, 0.7, 0.7, 1);
        this.woodPillar.setSpecular(0.0, 0.0, 0.0, 1);
        this.woodPillar.setShininess(120);
        this.woodPillar.loadTexture("images/pillarWood.jpg");
        this.woodPillar.setTextureWrap('REPEAT', 'REPEAT');
    }

    display()
    {
        this.woodPillar.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.scale(1, 11, 1);
        this.scene.pushMatrix();
        this.scene.translate(20,0,0);
        this.pillar.display();
        this.scene.translate(0,0,5);
        this.pillar.display();
        this.scene.translate(-13,0,-5);
        this.pillar.display();
        this.scene.translate(0,0,5);
        this.pillar.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}