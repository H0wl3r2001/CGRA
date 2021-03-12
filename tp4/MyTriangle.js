import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject
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
            //positive z face
            -2, 0, 0,   //0
            2 ,0 , 0,   //1
            0, 2, 0,    //2
            
            //negative z face
            2,  0,  0,  //3
            -2, 0,  0,  //4
            0,  2,  0   //5
        ];

        this.indices = 
        [
            //positive z face
            0,  1,  2,
            //negative z face
            3,  4,  5
        ];

        this.normals =
        [
            //positive z normals
            0,  0,  1,
            0,  0,  1,
            0,  0,  1,
            //negative z normals
            0,  0,  -1,
            0,  0,  -1,
            0,  0,  -1,
        ]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}