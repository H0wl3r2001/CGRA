attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

void main() {
	vTextureCoord = aTextureCoord;

	vec3 offset = aVertexNormal * texture2D(uSampler2, vTextureCoord).b;

	vec3 pos = aVertexPosition + offset;

	if(pos.y > 1.0)
		pos.y = 1.0;

	gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
}
