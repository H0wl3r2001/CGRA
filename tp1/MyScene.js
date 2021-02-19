import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import {MyTriangle} from "./MyTriangle.js";
import {MyParallelogram} from "./MyParallelogram.js";
import {MyTriangleSmall} from "./MyTriangleSmall.js";
import {MyTriangleBig} from "./MyTriangleBig.js";

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
    this.diamond = new MyDiamond(this);             //Diamond
    this.triangle = new MyTriangle(this);           //Triangle       - 1.2
    this.parallelogram = new MyParallelogram(this); //Parallelogram  - 1.4
    this.triangleSmall = new MyTriangleSmall(this); //Small Triangle - 2
    this.triangleBig = new MyTriangleBig(this);     //Big Triangle   - 2

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayTriangle = true;      //Triangle       - 1.1
    this.displayDiamond = true;       //Diamond        - 1.2
    this.displayParall = true;        //Parallelogram  - 1.4
    this.displayTriangleSmall = true; //Small Triangle - 2
    this.displayTriangleBig = true;   //Big Triangle   - 2
    this.scaleFactor = 1;
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
    if (this.displayTriangle) this.triangle.display();            //Triangle       - 1.1
    if (this.displayDiamond) this.diamond.display();              //Diamond        - 1.2
    if (this.displayParall) this.parallelogram.display();         //Parallelogram  - 1.4
    if (this.displayTriangleSmall) this.triangleSmall.display();  //Small Triangle - 2
    if (this.displayTriangleBig) this.triangleBig.display();      //Big Triangle   - 2
    // ---- END Primitive drawing section
  }
}
