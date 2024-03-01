import type { Line, Strategy, StrategyType, Lineal, Direction, Positions } from "../types";
import { options } from "./options";

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

export function spawn(type: "col" | "row", direction: Direction, initialX: number, initialY: number, w: number, h: number) {
  let selected: string = Math.random() < 0.5 ? "sin" : "lineal";

  let x = initialX;
  let y = initialY;
  let arise = 0,
    die = 0;

  if (direction === "down") {
    y = arise = h;
    die = 0;
    x = initialX;
  }
  if (direction === "up") {
    y = arise = 0;
    die = h;
    x = initialX;
  }
  if (direction === "left") {
    x = arise = 0;
    die = w;
    y = initialY;
  }
  if (direction === "right") {
    x = arise = w;
    die = 0;
    y = initialY;
  }

  let line: Line = {
    x,
    y,
    dv: direction === "left" || direction === "up" ? 2 : -2,
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

export function spawnRandomly(positions: Positions, lines: Line[], w: number, h: number) {
  let direction: Direction =
    Math.random() < options.probabilityDirection
      ? Math.random() < options.probabilityDirection
        ? "up"
        : "down"
      : Math.random() < options.probabilityDirection
      ? "left"
      : "right";
  if (direction === "left" || direction === "right") {
    lines.push(
      spawn(
        "row",
        direction,
        positions.row[Math.floor(Math.random() * positions.row.length)].x,
        positions.row[Math.floor(Math.random() * positions.row.length)].y,
        w,
        h
      )
    );
  } else if (direction === "up" || direction === "down") {
    lines.push(
      spawn(
        "col",
        direction,
        positions.col[Math.floor(Math.random() * positions.col.length)].x,
        positions.col[Math.floor(Math.random() * positions.col.length)].y,
        w,
        h
      )
    );
  }
}

export function die(line: Line) {
  //   if (!line.died)
  // if (line.direction === "down") console.log(line.x, line.die);
  if (line.direction === "left") if (line.x > line.die) line.died = true;
  if (line.direction === "right") if (line.x < line.die) line.died = true;
  if (line.direction === "up") if (line.y > line.die) line.died = true;
  if (line.direction === "down") if (line.y < line.die) line.died = true;
}
