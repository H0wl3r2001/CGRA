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
        this.vertices = [
            //negative z face
            0,  0,  0,  //0
            1,  1,  0,  //1
            2,  0,  0,  //2
            3,  1,  0,  //3
            //positive z face
            0,  0,  0,  //4
            2,  0,  0,  //5
            1,  1,  0,  //6
            3,  1,  0   //7
        ];

        this.indices = [
            //negative z face
            2,  0,  1,
            1,  3,  2,
            //positive z face
            4,  5,  6,
            6,  5,  7
        ];

        this.normals = [
            //negative z normals
            0,  0,  -1,
            0,  0,  -1,
            0,  0,  -1,
            0,  0,  -1,
            //positive z normals
            0,  0,  1,
            0,  0,  1,
            0,  0,  1,
            0,  0,  1
        ]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}