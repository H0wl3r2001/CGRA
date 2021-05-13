import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import {MyTriangleSmall} from './MyTriangleSmall.js';
import {MyTriangleBig} from './MyTriangleBig.js';

export class MyFish extends CGFobject
{
    constructor(scene, slices, stacks)
    {
        super(scene);
        this.body = new MySphere(scene, slices, stacks);
        this.eye1 = new MySphere(scene, slices, stacks);
        this.eye2 = new MySphere(scene, slices, stacks);
        this.rightFin = new MyTriangleSmall(scene);
        this.leftFin = new MyTriangleSmall(scene);
        this.topFin = new MyTriangleSmall(scene);
        this.swimmerFin = new MyTriangleBig(scene);
        this.initShaders();
        this.initMaterials();
        this.anglBack = 0;
        this.anglSideR = 0;
        this.anglSideL = 0;
        this.directionBack = 1;
        this.directionSideR = 1;
        this.directionSideL = -1;
    }

    initShaders(){
        this.bodyShader = new CGFshader(this.scene.gl, "shader/fishBody.vert", "shader/fishBody.frag");
    }
    
    initMaterials()
    {
        this.fishBodyTex = new CGFtexture(this.scene, "images/scales.jpg");

        this.fishEye = new CGFappearance(this.scene);
        this.fishEye.setAmbient(1, 1, 1, 1);
        this.fishEye.setDiffuse(1, 1, 1, 1);
        this.fishEye.setSpecular(1, 1, 1, 1);
        this.fishEye.setShininess(120);
        this.fishEye.loadTexture("images/fishEye.png");
        this.fishEye.setTextureWrap('REPEAT', 'REPEAT');

        this.fishFin = new CGFappearance(this.scene);
        this.fishFin.setAmbient(1, 0, 0, 1);
        this.fishFin.setDiffuse(1, 0, 0, 1);
        this.fishFin.setSpecular(1, 0, 0, 1);
        this.fishFin.setShininess(120);
        this.fishFin.setTextureWrap('REPEAT', 'REPEAT');
    };
    
    display()
    {
        this.scene.setActiveShader(this.bodyShader);
        this.fishBodyTex.bind(0);
        
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);

        //-------------body-------------
        this.scene.pushMatrix();
        this.scene.scale(1.5,1,1);
        this.scene.translate(0,3,0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.body.display();
        this.scene.popMatrix();
        //------------------------------

        this.scene.setActiveShader(this.scene.defaultShader);
        this.fishEye.apply();

        //-------------eyes-------------
        //left eye
        this.scene.pushMatrix();
        this.scene.translate(-1, 3, 0.7);
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/6, 0, 0, 1);
        this.eye1.display();
        this.scene.popMatrix();

        //right eye
        this.scene.pushMatrix();
        this.scene.translate(-1, 3, -0.7);
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/6, 0, 0, 1);
        this.eye2.display();
        this.scene.popMatrix();
        //------------------------------

        this.fishFin.apply();
        
        //-------------fins-------------
        //top fin
        this.scene.pushMatrix();
        this.scene.translate(-0.35,4,0);
        this.scene.rotate(5*Math.PI/4, 0,0,1);
        this.scene.scale(0.5,0.5,0.5);
        this.topFin.display();
        this.scene.popMatrix();

        //back fin
        this.scene.pushMatrix();
        this.scene.translate(1.5,3,0);
        this.scene.rotate(this.anglBack, 0,1,0);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.scene.scale(0.5,0.5,0.5);
        this.swimmerFin.display();
        this.scene.popMatrix();

        //left fin
        this.scene.pushMatrix();
        this.scene.translate(0, 3, 1);
        this.scene.rotate(this.anglSideL, 1,0,0);
        this.scene.rotate(3*Math.PI/4, 0,0,1);
        this.scene.rotate(Math.PI/6,1,1,0);
        this.scene.scale(0.5,0.5,0.5);
        this.leftFin.display();
        this.scene.popMatrix();

        //right fin
        this.scene.pushMatrix();
        this.scene.translate(0, 3, -1);
        this.scene.rotate(this.anglSideR, 1,0,0);
        this.scene.rotate(3*Math.PI/4, 0,0,1);
        this.scene.rotate(-Math.PI/6,1,1,0);
        this.scene.scale(0.5,0.5,0.5);
        this.rightFin.display();
        this.scene.popMatrix();
        //------------------------------

        this.scene.popMatrix();
    }

    animation()
    {
        if(this.anglBack >= Math.PI/9) //20 degrees
            this.directionBack = -1;

        if(this.anglBack <= -Math.PI/9)
            this.directionBack = 1;

        if(this.anglSideR > Math.PI/12) //15 degrees
            this.directionSideR = (-1);
        
        else if(this.anglSideR <= -Math.PI/12)
            this.directionSideR = 1;
        
        if(this.anglSideL > Math.PI/12) //15 degrees
            this.directionSideL = -1;
        
        else if(this.anglSideL <= -Math.PI/12)
            this.directionSideL = 1;

        this.anglBack += this.directionBack*3*(Math.PI/180);
        this.anglSideR += this.directionSideR*2*(Math.PI/180);
        this.anglSideL += this.directionSideL*2*(Math.PI/180); //one side does the opposite of the other
    }
}