import {CGFobject} from '../lib/CGF.js';
/**
* MyMovingObject
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, slices, stacks, speedFactor) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.v = 0.0;
        this.vY = 0.0;
        this.speedFactor = speedFactor;
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.ang = 0;
        this.state = 0; //0 if still, 1 if left-turning, 2 if right turning
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,0.5,0);
            this.vertices.push(ca, -0.5, -sa);
            this.vertices.push(caa, -0.5, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    update(){
        if(this.y < 0.0 || this.y > 5.0){   //for some reason I'm not entirely sure of, == 0.0/5.0 does not work
            this.vY = 0;
        }
        this.x += this.v*this.speedFactor*Math.sin(this.ang);
        //if we can move on the Y axis
        if(this.y + this.vY*this.speedFactor > 0.0 && this.y + this.vY*this.speedFactor < 5.0)
            this.y += this.vY*this.speedFactor;
        this.z += this.v*this.speedFactor*Math.cos(this.ang);
    }

    turn(val){
        if(val > 0)
            this.state = 1;
        else if(val < 0)
            this.state = 2;
        else
            this.state = 0;
            
        this.ang += val;
    }

    accelerate(val){
        this.v += val;
    }

    accelerateY(val){
        this.vY = val;
    }

    reset(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.v = 0;
        this.vY = 0;
        this.ang = 0;
    }
    
    //---not in the specification:---
    friction(){
        if(this.v == 0)
            return;

        this.v = (this.v > 0) ? (this.v - this.scene.fric) : (this.v + this.scene.fric);
    }
    //-------------------------------
}


