import type { Direction, Line, Positions, StrategyLayout } from "../types";
import { config } from "./configuration";
import { type __Line } from "./lines/line";
import { Folium } from "./lines/folium";
import { Straight } from "./lines/straight";
import { Wave } from "./lines/wave";
import { options as opt } from "./options";
import { smoothOscillation } from "./utils";
import { spawnRandomly, strategy_layout } from "./spawner";

let canvas = document.querySelector("canvas");
let ctx = canvas?.getContext("2d");

let lines: __Line[] = [];
let positions: Positions = { col: [], row: [] };
let fps = 0;
let last = 0;
let lastCalledTime = performance.now();
let focused = true;
let options: typeof opt = { ...opt };
const conf = config(options);

function drawCanvas() {
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.background = "#000";
  if (ctx) {
    //initialize possible horizontal positions
    for (
      let x = options.margin;
      x <= canvas.width - options.margin;
      x += options.gap
    ) {
      positions.col.push({ x, y: 0 });
    }

    //initialize possible vertical positions
    for (
      let y = options.margin;
      y <= canvas.height - options.margin;
      y += options.gap
    ) {
      positions.row.push({ x: 0, y });
    }

    requestAnimationFrame(loop);
  }
}
drawCanvas();
let ref = 0;
function loop(time: number) {
  ref = window.requestAnimationFrame(loop);
  if (!ctx || !canvas) return;

  // TIME
  let delteTime = (performance.now() - lastCalledTime) / 1000;
  lastCalledTime = performance.now();
  fps = 1 / delteTime;

  //TODO
  lines = lines.filter((l) => l.died !== true);
  // SPAWN LINES
  if (!last || (time - last >= options.spawnTime && focused)) {
    last = time;
    spawnRandomly(positions, lines, canvas.width, canvas.height);
  }
  // UPDATE LINES
  for (const line of lines) {
    line.update(ctx, time);
  }

  // BACKGROUND CONFIG
  ctx.globalCompositeOperation = "source-over";
  ctx.save();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(0,0,0,alp)".replace(
    "alp",
    options.backgroundAlpha.toString()
  );
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "lighter";

  ctx.restore();
}

window.onfocus = function () {
  focused = true;
};
window.onblur = function () {
  focused = false;
};

window.addEventListener("resize", () => {
  if (canvas) {
    cancelAnimationFrame(ref);
    lines = [];
    positions = { col: [], row: [] };
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCanvas();
  }
});
