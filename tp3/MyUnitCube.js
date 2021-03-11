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
            //positive z face
            0.5,    0.5,    0.5,    //0
            -0.5,   0.5,    0.5,    //1
            -0.5,   -0.5,   0.5,    //2
            0.5,    -0.5,   0.5,    //3
            //positive x face
            0.5,    0.5,    -0.5,   //4
            0.5,    0.5,    0.5,    //5
            0.5,    -0.5,   0.5,    //6
            0.5,    -0.5,   -0.5,   //7
            //negative z face
            -0.5,   0.5,    -0.5,    //8
            0.5,    0.5,    -0.5,    //9
            0.5,    -0.5,   -0.5,    //10
            -0.5,   -0.5,   -0.5,    //11
            //negative x face
            -0.5,   0.5,    0.5,    //12
            -0.5,   0.5,    -0.5,   //13
            -0.5,   -0.5,   -0.5,   //14
            -0.5,   -0.5,   0.5,    //15
            //positive y face
            0.5,    0.5,    -0.5,   //16
            -0.5,   0.5,    -0.5,   //17
            -0.5,   0.5,    0.5,    //18
            0.5,    0.5,    0.5,    //19
            //negative y face
            0.5,    -0.5,   0.5,    //20
            -0.5,   -0.5,   0.5,    //21
            -0.5,   -0.5,   -0.5,   //22
            0.5,    -0.5,   -0.5,   //23
        ]

        this.indices = [
            //positive z face
            0,  1,  2,
            2,  3,  0,
            //positive x face
            4,  5,  6,
            6,  7,  4,
            //negative z face
            8,  9,  10,
            10, 11, 8,
            //negative x face
            12, 13, 14,
            14, 15, 12,
            //positive y face
            16, 17, 18,
            18, 19, 16,
            //negative y face
            20, 21, 22,
            22, 23, 20
        ]

        this.normals = [
            //positive z normals
            0,    0,   1,    //0
            0,    0,   1,    //1
            0,    0,   1,    //2
            0,    0,   1,    //3
            //positive x normals
            1,    0,   0,    //4
            1,    0,   0,    //5
            1,    0,   0,    //6
            1,    0,   0,    //7
            //negative z normals
            0,    0,   -1,    //8
            0,    0,   -1,    //9
            0,    0,   -1,    //10
            0,    0,   -1,    //11
            //negative x normals
            -1,   0,   0,    //12
            -1,   0,   0,    //13
            -1,   0,   0,    //14
            -1,   0,   0,    //15
            //positive y normals
            0,    1,   0,    //16
            0,    1,   0,    //17
            0,    1,   0,    //18
            0,    1,   0,    //19
            //negative y normals
            0,    -1,  0,   //20
            0,    -1,  0,   //21
            0,    -1,  0,   //22
            0,    -1,  0,   //23
        ]
        
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}