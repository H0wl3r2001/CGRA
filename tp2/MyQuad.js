import {CGFobject, CGFscene} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyQuad extends CGFobject{
    constructor(scene){
		super(scene);
		this.initBuffers(scene);
    }

    initBuffers(){
        //Counter-clockwise reference of vertices
        this.vertices = 
        [
            -0.5,   0,  -0.5,   //0
            -0.5,   0,  0.5,    //1
            0.5,    0,  0.5,    //2
            0.5,    0,  -0.5    //3
        ];

        this.indices = 
        [
            0,1,2,
            0,2,3
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}