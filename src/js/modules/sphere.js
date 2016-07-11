const glslify = require('glslify');

export default class Sphere {
  constructor() {
    this.radius = 200;
    this.mesh = this.createMesh();
  }
  createMesh() {
    return new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: {
          radius: {
            type: 'f',
            value: this.radius,
          }
        },
        vertexShader: glslify('../../glsl/sphere.vs'),
        fragmentShader: glslify('../../glsl/sphere.fs'),
      })
    );
  }
}
