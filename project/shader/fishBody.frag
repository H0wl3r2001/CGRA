#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec4 colorVals;

void main() {
    if(vTextureCoord.y < 0.4)
        gl_FragColor = colorVals;
    else
        gl_FragColor = texture2D(uSampler, vTextureCoord);
}