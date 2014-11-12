#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 tint;
varying vec3 vNormal;

void main() {
    gl_FragColor = vec4(abs(vNormal), 1.0);
}
