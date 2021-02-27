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
    this.diamond = new MyDiamond(this);             
    this.triangle = new MyTriangle(this);           
    this.parallelogram = new MyParallelogram(this);
    this.triangleSmall1 = new MyTriangleSmall(this);
    this.triangleSmall2 = new MyTriangleSmall(this);
    this.triangleBig1 = new MyTriangleBig(this);
    this.triangleBig2 = new MyTriangleBig(this);     

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayTriangle = true;      
    this.displayDiamond = true;       
    this.displayParall = true;        
    this.displayTriangleSmall1 = true;
    this.displayTriangleSmall2 = true; 
    this.displayTriangleBig1 = true;
    this.displayTriangleBig2 = true;   
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
  
    //diamond head
    this.pushMatrix();

    var m_trans = [
      1,0,0,0,
      0,1,0,0,
      0,0,1,0,
      -Math.SQRT2/2, 3*Math.SQRT2/2,0,1
    ]

    this.multMatrix(m_trans);

    var m_rot = 
    [
      Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0,0,
      -Math.sin(Math.PI/4), Math.cos(Math.PI/4),0,0,
      0,0,1,0,
      0,0,0,1
    ]

    this.multMatrix(m_rot);
    

    if (this.displayDiamond) this.diamond.display();

    this.popMatrix();

    //1st ear - parallelogram
    this.pushMatrix();

    this.translate(0,2*Math.SQRT2,0);

    this.rotate(Math.PI,0,1,0);
    this.rotate(Math.PI/4,0,0,1);

    if(this.displayParall) this.parallelogram.display();

    this.popMatrix();

    //2nd ear - triangle
    this.pushMatrix();

    this.translate(2*Math.SQRT2/3,8*Math.SQRT2/3,0);
    this.scale(2/3,2/3,2/3);
    this.rotate(-3*Math.PI/4,0,0,1);
    if(this.displayTriangle) this.triangle.display();

    this.popMatrix();

    //arm - 1st small triangle

    this.pushMatrix();

    this.translate(0,1-3*Math.SQRT2/8,0);
    this.rotate(Math.PI/2,0,0,1);

    if(this.displayTriangleSmall1) this.triangleSmall1.display();

    this.popMatrix();
    
    // ---- END Primitive drawing section
  }
}
