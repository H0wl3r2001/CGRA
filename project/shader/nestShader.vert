attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;         //model view matrix
uniform mat4 uPMatrix;          //projection matrix
uniform mat4 uNMatrix;          //normal transformation matrix

varying vec2 vTextureCoord;     //how does this differ from aTextureCoord? I think it's just a temp variable so we don't alter the original one

void main() {
        vTextureCoord = aTextureCoord;  

        vec3 modifiedPos = aVertexPosition;

        if(aVertexPosition.y > 0.0){
                modifiedPos.y = -modifiedPos.y;
                modifiedPos *= 0.6;
        }

        gl_Position = uPMatrix * uMVMatrix * vec4(modifiedPos, 1.0);
}
