import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject
{
    constructor(scene)
    {
        super(scene);
        this.initBuffers();
    }

    initBuffers ()
    {
		//Counter-clockwise reference of vertices
        this.vertices = 
        [
            0,0,0, //0
            1,1,0, //1
            2,0,0, //2
            3,1,0, //3

            0,0,0, //4
            1,1,0, //5
            2,0,0, //6
            3,1,0  //7
        ];

        this.indices = 
        [
            2,0,1,
            1,3,2,
            6,7,5,
            5,4,6
        ];

        this.normals = 
        [
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}