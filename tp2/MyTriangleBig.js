import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject
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
            -4, 0, 0,   //0
            4 ,0 , 0,   //1
            0, 4, 0     //2
        ];

        this.indices = 
        [
            0,1,2
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}