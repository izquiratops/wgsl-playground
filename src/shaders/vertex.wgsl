@vertex
fn main(
  @builtin(vertex_index) VertexIndex : u32
) -> @builtin(position) vec4f {
  var pos : array<vec2f, 6> = array<vec2f, 6>(
    vec2f(-1., -1.), vec2f(-1., 1.), vec2f(1., 1.),
    vec2f(1., -1.), vec2f(-1., -1.), vec2f(1., 1.)
  );

  return vec4f(pos[VertexIndex], 0.0, 1.0);
}