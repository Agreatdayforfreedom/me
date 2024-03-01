import type { Line, Strategy, StrategyType, Lineal } from "../types";

const strategy: Strategy = {
  sin: {
    counter: 0,
    increase: ((90 / 180) * Math.PI) / 9,
  },
  lineal: {
    dx: 2.0,
    dy: 2.0,
  },
};
export function spawn({ x, y, type, initialX, initialY, arise, die, direction }: Omit<Line, "start">): Line {
  let selected: string = Math.random() < 0.5 ? "sin" : "lineal";
  let line: Line = {
    x,
    y,
    type,
    initialX,
    initialY,
    start: Math.random() < 0.1,
    arise,
    die,
    died: false,
    strategy: { ...strategy[selected as keyof Strategy] },
    direction,
  };
  return line;
}

export function die(line: Line) {
  //   if (!line.died)
  // if (line.direction === "down") console.log(line.x, line.die);
  if (line.type === "row") {
    if (line.direction === "left") if (line.x > line.die) line.died = true;
    if (line.direction === "right") if (line.x < line.die) line.died = true;
  } else if (line.type === "col") {
    if (line.direction === "up") if (line.y > line.die) line.died = true;
    if (line.direction === "down") if (line.y < line.die) line.died = true;
  }
}
