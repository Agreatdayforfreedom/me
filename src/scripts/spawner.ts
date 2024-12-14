import { Straight } from "./lines/straight";
import { Wave } from "./lines/wave";
import { options } from "./options";
import type { Direction, Positions, StrategyLayout } from "../types";
import type { __Line } from "./lines/line";
import { Folium } from "./lines/folium";

// todo
export const strategy_layout: StrategyLayout = {
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

export function spawnRandomly(
  positions: Positions,
  lines: __Line[],
  w: number,
  h: number
) {
  let direction: Direction =
    Math.random() < options.probabilityDirection
      ? Math.random() < options.probabilityDirection
        ? "up"
        : "down"
      : Math.random() < options.probabilityDirection
      ? "left"
      : "right";

  if (Math.random() < 0.5) {
    if (direction === "left" || direction === "right") {
      lines.push(
        new Wave(
          "row",
          direction,
          { ...strategy_layout.sin },
          positions.row[Math.floor(Math.random() * positions.row.length)].x,
          positions.row[Math.floor(Math.random() * positions.row.length)].y,
          w,
          h
        )
      );
    } else if (direction === "up" || direction === "down") {
      lines.push(
        new Straight(
          "col",
          direction,
          { ...strategy_layout.lineal },
          positions.col[Math.floor(Math.random() * positions.col.length)].x,
          positions.col[Math.floor(Math.random() * positions.col.length)].y,
          w,
          h
        )
      );
    }
  } else {
    const n = Math.floor(Math.random() * 5);
    const posx = Math.floor(Math.random() * w);
    const posy = Math.floor(Math.random() * h);

    let rotation = Math.floor(Math.random() * 360);

    const max = rotation + 15;
    const min = rotation - 15;
    const color = options.color.replace(
      "hue",
      Math.floor(Math.random() * (max - min) + min).toString()
    );

    for (let i = 0; i < n; i++) {
      lines.push(
        new Folium(
          { ...strategy_layout["folium_of_descartes"] },
          posx,
          posy,
          color,
          w,
          h
        )
      );
    }
  }
}
