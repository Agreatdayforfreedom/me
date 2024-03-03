import type { Line, Strategy, StrategyType, Lineal, Direction, Positions } from "../types";
import { options } from "./options";

const strategy: Strategy = {
  sin: {
    counter: 0,
    increase: ((90 / 180) * Math.PI) / 9,
    waveLength: 10,
  },
  lineal: {
    dx: 2.0,
    dy: 2.0,
  },
  folium_of_descartes: {
    a: 50,
    inc: 1,
    t: -100,
    lifetime: 0,
    dfx: 1,
    dfy: 1,
  },
};

export function spawnFoliumOfDescartes(w: number, h: number): Line {
  const a = Math.floor(Math.random() * (100 - 10) + 10);
  const t = -5;
  const initialX = Math.floor(Math.random() * w);
  const initialY = Math.floor(Math.random() * h);
  const x = initialX + (3 * a * t) / (1 + Math.pow(t, 3));
  const y = initialY + (3 * a * Math.pow(t, 2)) / (1 + Math.pow(t, 3));
  const color = options.color.replace("hue", Math.floor(Math.random() * 360).toString());

  let dfx = 1;
  let dfy = 1;

  // bottom
  if (initialX + a > w) dfx = -1;
  // top
  else if (initialX - a < 0) dfx = 1;
  // pick random direction
  else dfx = Math.random() < 0.5 ? 1 : -1;
  // right
  if (initialY + a > h) dfy = -1;
  //left
  else if (initialY - a < 0) dfy = 1;
  // same
  else dfy = Math.random() < 0.5 ? 1 : -1;

  let line: Line = {
    x,
    y,
    initialX,
    initialY,
    arise: 0,
    die: 0,
    color,
    strategy: { ...strategy["folium_of_descartes"], dfx, dfy, a },
    dv: 0,
    type: "col",
    start: false,
  };
  return line;
}

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
  let color = options.color.replace("hue", Math.floor(Math.random() * 360).toString());
  let line: Line = {
    x,
    y,
    dv: direction === "left" || direction === "up" ? 2 : -2,
    type,
    color,
    initialX,
    initialY,
    start: Math.random() < 0.1,
    arise,
    die,
    died: false,
    strategy: { ...strategy[selected as keyof Strategy] },
    direction,
  };

  if (line.strategy && "waveLength" in line.strategy) {
    line.strategy.waveLength = Math.floor(Math.random() * (10 - 3) + 3);
  }

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
  if (line.strategy && "lifetime" in line.strategy) if (line.strategy.lifetime > 3.5) line.died = true;
  if (line.direction === "left") if (line.x > line.die) line.died = true;
  if (line.direction === "right") if (line.x < line.die) line.died = true;
  if (line.direction === "up") if (line.y > line.die) line.died = true;
  if (line.direction === "down") if (line.y < line.die) line.died = true;
}
