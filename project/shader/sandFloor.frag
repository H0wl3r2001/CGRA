#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D uSampler2;

void main() {
    vec4 texColor = texture2D(uSampler, vTextureCoord);
    vec4 filterColor = texture2D(uSampler2, vTextureCoord);
    gl_FragColor = texColor * 0.5 + filterColor * 0.5;
}