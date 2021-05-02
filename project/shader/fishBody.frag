#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {
    if(vTextureCoord.y < 0.4)
        gl_FragColor = vec4(1,0,0,1);
    else
        gl_FragColor = texture2D(uSampler, vTextureCoord);
}