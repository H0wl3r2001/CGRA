import {CGFobject, CGFscene} from '../lib/CGF.js';
/**
 * My Cube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers ()
    {
		this.vertices = [
			-0.5,-0.5,-0.5,                 //0
            0.5,-0.5,-0.5,                  //1
            0.5,0.5,-0.5,                   //2
            -0.5,0.5,-0.5,                  //3
            -0.5,-0.5,0.5,                  //4
            0.5,-0.5,0.5,                   //5
            0.5,0.5,0.5,                    //6
            -0.5,0.5,0.5                    //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0, //1st face - backward
			0, 3, 2, //1st face - backward
            4, 5, 6, //2nd face - forward
            6, 7, 4, //2nd face - forward
            6, 5, 1, //3rd face - right
            1, 2, 6, //3rd face - right
            7, 3, 0, //4th face - left
            0, 4, 7, //4th face - left
            6, 2, 3, //5th face - upward
            3, 7, 6, //5th face - upward
            1, 5, 4, //6th face - downward
            4, 0, 1  //6th face - downward
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}