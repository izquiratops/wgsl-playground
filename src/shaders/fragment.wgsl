struct Uniforms {
    resolution: vec2f,
    time: f32
};
@binding(0) @group(0) var<uniform> U : Uniforms;

fn color(p: vec2f) -> vec3f {
  let a = atan2(p.y, p.x);
  let r = length(p);
  let s = .6 * r / (r * r + .4);
  let t = 0.0005*U.time;

  return sin(vec3f(a+.1*t, a+1.5*t, a+2.9*t)) * s +.5;
}

@fragment
fn main(@builtin(position) FragCoord : vec4f) -> @location(0) vec4f {
  var uv: vec2f = (2. * FragCoord.xy - U.resolution);
  uv = uv / vec2f(U.resolution.y, -U.resolution.y);

  return vec4f(sqrt(color(uv)), 1.0);
}