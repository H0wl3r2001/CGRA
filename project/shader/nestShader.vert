attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

void main() {
        vTextureCoord = aTextureCoord;  

        vec3 modifiedPos = aVertexPosition;

        if(aVertexPosition.y > 0.0){
                modifiedPos.y = -modifiedPos.y;
                modifiedPos *= 0.6;
        }

        gl_Position = uPMatrix * uMVMatrix * vec4(modifiedPos, 1.0);
}
