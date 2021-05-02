#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {
    if((vTextureCoord.x)*(vTextureCoord.x) + (vTextureCoord.y)*(vTextureCoord.y) < 0.18)
        gl_FragColor = vec4(0, 0, 0, 1);
    else
        gl_FragColor = vec4(1,1,1,1);
}
