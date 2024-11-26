export function smoothOscillation(
  time: number,
  center: number,
  amplitude: number,
  speed: number = 0.001
): number {
  return amplitude * Math.sin(time * speed) + center;
}
