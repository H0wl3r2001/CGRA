import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import {MyCubeMap} from "./MyCubeMap.js";
import {MyCylinder} from "./MyCylinder.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyNest } from "./MyNest.js";
import { MySky } from "./MySky.js";
import { MyRockSet } from "./MyRockSet.js";
import {MyPillarSet} from "./MyPillarSet.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        this.texture_test = [
            'images/demo_cubemap/back.png',
            "images/demo_cubemap/bottom.png",
            "images/demo_cubemap/front.png",
            "images/demo_cubemap/left.png",
            "images/demo_cubemap/right.png",
            "images/demo_cubemap/top.png"
        ]
        
        this.texture_desert =
        [
            "images/desert_prison/desert_front.jpg",
            "images/desert_prison/desert_bottom.jpg",
            "images/desert_prison/desert_front.jpg",
            "images/desert_prison/desert_front.jpg",
            "images/desert_prison/desert_front.jpg",
            "images/desert_prison/sky_top.jpg"
        ]

        this.texture_ocean = [
            "images/underwater_cubemap/back.jpg",
            "images/underwater_cubemap/bottom.jpg",
            "images/underwater_cubemap/front.jpg",
            "images/underwater_cubemap/left.jpg",
            "images/underwater_cubemap/right.jpg",
            "images/underwater_cubemap/top.jpg"
        ]

        
        //map-texture changeable features
        this.textureMapID ={'test': 0, 'desert': 1, 'ocean': 2};

        this.texlists = [this.texture_test, this.texture_desert, this.texture_ocean];
        this.selectedTexture = 2;

        //Scene objects
        this.axis = new CGFaxis(this);
        this.skyBox = new MyCubeMap(this, this.texlists[this.selectedTexture]);
        this.cylinder = new MyCylinder(this, 6);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.movingObject = new MyMovingObject(this,4,1);
        this.fish = new MyFish(this, 16, 8);
        this.seaFloor = new MySeaFloor(this);
        this.nest = new MyNest(this);
        this.sky = new MySky(this);
        this.rockSet = new MyRockSet(this, 200);
        this.pillarSet = new MyPillarSet(this);

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);

        this.sphereEarth = new CGFappearance(this);
        this.sphereEarth.setAmbient(0.3, 0.3, 0.3, 1);
        this.sphereEarth.setDiffuse(0.7, 0.7, 0.7, 1);
        this.sphereEarth.setSpecular(0.0, 0.0, 0.0, 1);
        this.sphereEarth.setShininess(120);
        this.sphereEarth.loadTexture("images/earth.jpg");
        this.sphereEarth.setTextureWrap('REPEAT', 'REPEAT');


        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayMovingObject = false;
        this.displaySphere = false;
        this.displayCylinder = false;
        this.fric = 0.005;
        this.scaleFactor = 1;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        // this.camera = new CGFcamera(1.5, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 0, 0));       //CGFcamera(fov,near,far,position,target)
        this.camera = new CGFcamera(1.5, 0.1, 500, vec3.fromValues(3, 6, 3), vec3.fromValues(0, 1, 0));       //CGFcamera(fov,near,far,position,target)
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
        this.checkKeys();
        //---not in the specification:---
        this.movingObject.friction();
        //-------------------------------
        this.movingObject.update();

        this.fish.animation();

        this.sky.waterShader.setUniformsValues({ timeFactor: t % 100000 });
    }

    changeText()
    {
        this.texlists[this.selectedTexture];
        this.skyBox.updateTex(this.texlists[this.selectedTexture]);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // ---- BEGIN Primitive drawing section

        // Draw axis
        if (this.displayAxis)
            this.axis.display();
        
        //display project objects
        //we display objects which use shaders
        //sequentially, because the
        //setActiveShader function is very slow
        //and may cause performance issues

        //---OBJECTS NOT USING SHADERS---
        this.skyBox.display();
        this.rockSet.display();
        this.pillarSet.display();

        //---OBJECTS USING SHADERS-------
        //ambient
        this.seaFloor.display();
        this.sky.display();
        this.nest.display();

        //fish
        //we draw it last because it resets the
        //shader to the default scene one, in order
        //to draw an element of its body
        this.pushMatrix();
        this.translate(0, 2, 0);
        this.fish.display();
        this.popMatrix();

        //reset scene appearance
        this.defaultAppearance.apply();


        //Mario: do we really need to keep these objects (globe, cylinder and movingObject)?
        this.sphereEarth.apply();
        if(this.displaySphere){
            //This sphere does not have defined texture coordinates
            this.incompleteSphere.display();
        }

        this.defaultAppearance.apply();
        
        if(this.displayCylinder)
        {
            this.cylinder.display();
        }

        this.pushMatrix();
        this.translate(this.movingObject.x, this.movingObject.y, this.movingObject.z);
        this.rotate(this.movingObject.ang,0, 1, 0);
        this.rotate(Math.PI/2,1,0,0);
        if(this.displayMovingObject){
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.movingObject.display();
        }
        this.popMatrix();

        // ---- END Primitive drawing section
    }

     checkKeys(){
         var text = "Keys pressed: ";
         var keysPressed = false;

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")){
            text+=" W ";
            this.movingObject.accelerate(0.01);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyS")){
            text+= " S ";
            this.movingObject.accelerate(-0.01);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyA")){
            text+= " A ";
            this.movingObject.turn(Math.PI/16);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyD")){
            text+= " D ";
            this.movingObject.turn(-Math.PI/16);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyP")){
            text += " P ";
            this.movingObject.setY(3);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyL")){
            text += " L ";
            this.movingObject.setY(-3);
            keysPressed = true;
        }


        if(this.gui.isKeyPressed("KeyR")){
            text += " R ";
            this.movingObject.reset();
            keysPressed = true;
        }

        if(keysPressed)
            console.log(text);
     }
}