import type { Line } from "../types";

export function spawn({ id, x, y, type, initialX, initialY, arise, die }: Omit<Line, "start">): Line {
  let line = {
    id,
    x,
    y,
    type,
    initialX,
    initialY,
    start: Math.random() < 0.1,
    arise,
    die,
  };

  return line;
}

export function die(line: Line) {
  if (!line.died)
    if (line.type === "row") {
      if (line.x > line.die) line.died = true;
    } else if (line.type === "col")
      if (line.y > line.die) {
        line.died = true;
      }
}
