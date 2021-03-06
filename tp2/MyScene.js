import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
// import { MyDiamond } from "./MyDiamond.js";
// import {MyTriangle} from "./MyTriangle.js";
// import {MyParallelogram} from "./MyParallelogram.js";
// import {MyTriangleSmall} from "./MyTriangleSmall.js";

//    Exercise 3
import {  MyTangram   } from "./MyTangram.js";
import {  MyUnitCube  } from "./MyUnitCube.js";

//    Exercise 4
import {  MyUnitCubeQuad  } from "./MyUnitCubeQuad.js";


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

    //Initialize scene objects
    this.axis = new CGFaxis(this);

    //    Exercise 2
    this.trangram = new MyTangram(this);

    //    Exercise 3
    this.cube = new MyUnitCube(this);

    //    Exercise 4
    this.unitCubeQuad = new MyUnitCubeQuad(this);
    
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    //    Exercise 2
    this.displayTangram = true;

    //    Exercise 3
    this.displayCube = true;

    //    Exercise 4
    this.displayUnitCubeQuad = true;

  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
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

    // Draw axis
    if (this.displayAxis) this.axis.display();
    
    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section
    
    //    Exercise 2
    this.pushMatrix();

    this.translate(0.5,0,0.5);
    this.rotate(3*Math.PI/2,1,0,0);

    if(this.displayTangram) this.trangram.display(this);
    this.popMatrix();

    //    Exercise 3 and 4
    this.pushMatrix();
    
    this.translate(0.5,-0.6,0.5);
    this.scale(6, 1, 12);

    //    Exercise 3
    if(this.displayCube) this.cube.display();

    //    Exercise 4
    if(this.displayUnitCubeQuad) this.unitCubeQuad.display(this);

    this.popMatrix();

    
    // ---- END Primitive drawing section
  }
}
