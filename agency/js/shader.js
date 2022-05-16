let vertexShader =
    "precision mediump float; \n" +
    "attribute vec2 a_position; \n" +
    "attribute vec2 a_texcoord; \n" +
    "varying vec2 v_texcoord; \n" +
    "uniform float u_strength; \n" +
    "uniform float u_radius; \n" +
    "uniform float u_time; \n" +
    "uniform float u_delta; \n" +
    "uniform vec2 u_center; \n" +
    "mat4 getProjectionMatrix() { \n" +
    "    vec4 vec_0 = vec4(1.0, 0.0, 0.0, 0.0); \n" +
    "    vec4 vec_1 = vec4(0.0, 1.0, 0.0, 0.0); \n" +
    "    vec4 vec_2 = vec4(0.0, 0.0, 0.0, -1.5); \n" +
    "    vec4 vec_3 = vec4(0.0, 0.0, 0.0, 0.0); \n" +
    "    return mat4(vec_0, vec_1, vec_2, vec_3); \n" +
    "} \n" +
    "mat4 getObjectMatrix() { \n" +
    "    vec4 vec_0 = vec4(1.0, 0.0, 0.0, 0.0); \n" +
    "    vec4 vec_1 = vec4(0.0, 1.0, 0.0, 0.0); \n" +
    "    vec4 vec_2 = vec4(0.0, 0.0, 1.0, 0.0); \n" +
    "    vec4 vec_3 = vec4(0.0, 0.0, 0.0, 1.0); \n" +
    "    return mat4(vec_0, vec_1, vec_2, vec_3); \n" +
    "} \n" +
    "void main() { \n" +
    "    vec3 pos = vec3(a_position, -1.0); \n" +
    "    v_texcoord = a_texcoord; \n" +
    "    vec2 uv = vec2(v_texcoord); \n" +
    "    uv.x -= 0.5; \n" +
    "    uv.y -= 0.5; \n" +
    "    float d = length(uv - u_center); \n" +
    "    d = 1.0 - smoothstep(0.0, u_radius, d); \n" +
    "    pos.z += d * u_strength; \n" +
    "    gl_Position = getProjectionMatrix() * getObjectMatrix() * vec4(pos, 1.0); \n" +
    "}";

let fragmentShader = "#ifdef GL_ES \n" +
    "precision mediump float;  \n" +
    "#endif \n" +
    "varying vec2 v_texcoord;  \n" +
    "uniform sampler2D u_tex0;  \n" +
    "uniform float u_delta;  \n" +
    "uniform float u_time;  \n" +
    "uniform float u_date;  \n" +
    "uniform vec2 u_mouse;  \n" +
    "void main(){  \n" +
    "    gl_FragColor = texture2D(u_tex0, v_texcoord);  \n" +
    "}";

let shadersValues = {
    strength: 0,
    origin: { x: 0, y: 0 },
    radius: 1.3
};

function updateUniforms() {
    canvas.setUniform('u_strength', shadersValues.strength);
    canvas.setUniform('u_center', shadersValues.origin.x, shadersValues.origin.y);
}

function initCanvas(canvas) {
    let canvasEl = document.querySelector('canvas');
    canvas.setUniform('u_strength', shadersValues.strength);
    canvas.setUniform('u_center', shadersValues.origin.x, shadersValues.origin.y);
    canvas.setUniform('u_radius', shadersValues.radius);

    canvasEl.addEventListener('mousemove', (event) => {
        let rect = canvasEl.getBoundingClientRect();
        let obj = { x: (event.clientX - rect.left) / rect.width, y: event.clientY / rect.height };
        TweenMax.to(shadersValues.origin, 0.3, { x: obj.x - 0.5, ease: Elastic.easeOut, onUpdate: updateUniforms.bind(this) });
        TweenMax.to(shadersValues.origin, 0.8, { y: -(obj.y - 0.5), ease: Elastic.easeOut, overwrite: false, onUpdate: updateUniforms.bind(this) });
    });
    canvasEl.addEventListener('mouseover', (event) => {
        TweenMax.to(shadersValues, 1, { strength: 0.2, ease: Elastic.easeOut, onUpdate: updateUniforms.bind(this) })
    });
    canvasEl.addEventListener('mouseout', (event) => {
        TweenMax.to(shadersValues, 1, { strength: 0, ease: Elastic.easeOut, onUpdate: updateUniforms.bind(this) })
    });

    canvas.setUniform('u_tex0', 'https://assets-global.website-files.com/5f9072399b2640f14d6a2bf4/625489cc18bfe0b12a83e4a2_202201010_PM_CommandPermissionsBlog_JJ_v04.jpg');
}


let canvasEl = document.querySelector('canvas');
let canvas = new GlslCanvas(canvasEl, { vertexString: vertexShader, fragmentString: fragmentShader });

initCanvas(canvas);