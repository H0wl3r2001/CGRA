#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 aTextureCoord;

uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
    vec4 distMapColor = texture2D(uSampler2, vTextureCoord + (timeFactor * 0.00001));
    vec2 offset = ( vec2(distMapColor.r, distMapColor.g) - 0.5 ) * 0.3;
    vec2 modified = vTextureCoord + offset;
    if(modified.x > 0.999 || modified.x <= 0.001 || modified.y > 0.999 || modified.y <= 0.001)
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    else
        gl_FragColor = texture2D(uSampler, modified);
}