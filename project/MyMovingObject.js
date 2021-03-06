import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';
/**
* MyMovingObject
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.v = 0.0;
        this.vY = 0.0;
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
        var alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa = Math.sin(ang);
            var saa = Math.sin(ang + alphaAng);
            var ca = Math.cos(ang);
            var caa = Math.cos(ang + alphaAng);

            this.vertices.push(0, 0.5, 0);
            this.vertices.push(ca, -0.5, -sa);
            this.vertices.push(caa, -0.5, -saa);

            // triangle normal computed by cross product of two edges
            var normal = [
                saa - sa,
                ca * saa - sa * caa,
                caa - ca
            ];

            // normalization
            var nsize = Math.sqrt(
                normal[0] * normal[0] +
                normal[1] * normal[1] +
                normal[2] * normal[2]
            );
            normal[0] /= nsize;
            normal[1] /= nsize;
            normal[2] /= nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3 * i, (3 * i + 1), (3 * i + 2));

            ang += alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    update(speedFactor, deltaTime) {
        this.x += this.v * Math.sin(this.ang) * speedFactor * deltaTime;
        this.z += this.v * Math.cos(this.ang) * speedFactor * deltaTime;
    }

    turn(val) {
        if (val > 0)
            this.state = 1;
        else if (val < 0)
            this.state = 2;
        else
            this.state = 0;

        this.ang += val;
    }

    accelerate(val) {
        this.v += val;
    }

    accelerateY(val) {
        this.vY = val;
    }

    /**
     * Must return a hypothetical rock in the fish's mouth to its original position.
     * @param {*} mouth - an array that contains the object, the original position, the scale and the original index of the rockSet.
     */
    reset(originalPos, originalVel) {
        this.x = originalPos[0];
        this.y = originalPos[1];
        this.z = originalPos[2];
        this.v = originalVel;
        this.vY = 0;
        this.ang = 0;
    }

    //---not in the specification:---
    friction(deltaTime) {
        if (this.v == 0)
            return;

        this.v = (this.v > 0) ? (this.v - this.scene.fric * deltaTime) : (this.v + this.scene.fric * deltaTime);
    }
    //-------------------------------
}


