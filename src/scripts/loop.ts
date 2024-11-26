import type { Direction, Line, Positions } from "../types";
import { config } from "./configuration";
import { die, spawn, spawnFoliumOfDescartes, spawnRandomly } from "./line";
import { options as opt } from "./options";

let canvas = document.querySelector("canvas");
let ctx = canvas?.getContext("2d");

let lines: Line[] = [];
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
    //horizontal position
    for (
      let x = options.margin;
      x <= canvas.width - options.margin;
      x += options.gap
    ) {
      let direction: Direction =
        Math.random() < options.probabilityDirection ? "up" : "down";
      positions.col.push({ x, y: 0 });
      if (Math.random() < options.probabilityOfArising) {
        lines.push(spawn("col", direction, x, 0, canvas.width, canvas.height));
      }
    }

    // vertical position
    for (
      let y = options.margin;
      y <= canvas.height - options.margin;
      y += options.gap
    ) {
      let direction: Direction =
        Math.random() < options.probabilityDirection ? "left" : "right";
      positions.row.push({ x: 0, y });

      if (Math.random() < options.probabilityOfArising) {
        lines.push(spawn("row", direction, 0, y, canvas.width, canvas.height));
      }
    }

    requestAnimationFrame(loop);
  }
}
drawCanvas();
let ref = 0;
function loop(time: number) {
  ref = window.requestAnimationFrame(loop);
  if (!ctx || !canvas) return;

  //fps
  let delteTime = (performance.now() - lastCalledTime) / 1000;
  lastCalledTime = performance.now();
  fps = 1 / delteTime;
  lines = lines.filter((l) => l.died !== true);

  if (!last || (time - last >= options.spawnTime && focused)) {
    last = time;
    if (Math.random() < 0.5) {
      spawnRandomly(positions, lines, canvas.width, canvas.height);
    } else {
      const n = Math.floor(Math.random() * 5);
      const posx = Math.floor(Math.random() * canvas.width);
      const posy = Math.floor(Math.random() * canvas.height);
      for (let i = 0; i < n; i++) {
        lines.push(
          spawnFoliumOfDescartes(canvas.width, canvas.height, posx, posy)
        );
      }
    }
  }

  //bg
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

  for (const line of lines) {
    if (!line.died)
      if (line.strategy) {
        if ("dx" in line.strategy) {
          if (line.direction === "left") {
            line.x += line.dv;
          } else if (line.direction === "up") {
            line.y += line.dv;
          } else if (line.direction === "right") {
            line.x += line.dv;
          } else if (line.direction === "down") {
            line.y += line.dv;
          }
        } else if ("counter" in line.strategy) {
          // sin
          if (line.direction === "left") {
            line.y =
              line.initialY +
              Math.sin(line.strategy.counter) * line.strategy.waveLength;
            line.x += line.dv;
          } else if (line.direction === "up") {
            line.x =
              line.initialX +
              Math.sin(line.strategy.counter) * line.strategy.waveLength;
            line.y += line.dv;
          } else if (line.direction === "right") {
            line.y =
              line.initialY +
              Math.sin(line.strategy.counter) * line.strategy.waveLength;
            line.x += line.dv;
          } else if (line.direction === "down") {
            line.x =
              line.initialX +
              Math.sin(line.strategy.counter) * line.strategy.waveLength;
            line.y += line.dv;
          }
          line.strategy.counter += line.strategy.increase;
        } else if ("t" in line.strategy) {
          line.strategy.inc = Math.abs(Math.cos(line.strategy.lifetime));
          line.strategy.lifetime += 0.01;

          line.x =
            line.initialX +
            (3 * line.strategy.dfx * line.strategy.a * line.strategy.t) /
              (1 + Math.pow(line.strategy.t, 3));
          line.y =
            line.initialY +
            (3 *
              line.strategy.dfy *
              line.strategy.a *
              Math.pow(line.strategy.t, 2)) /
              (1 + Math.pow(line.strategy.t, 3));
          line.strategy.t += line.strategy.inc;
        }
      }

    ctx.fillStyle = ctx.shadowColor = line.color.replace(
      "lightness",
      (Math.abs(Math.sin(time / 1000)) * 30 + 30).toString()
    );
    ctx.shadowBlur = Math.random() * options.shadowMultiplier;
    ctx.fillRect(line.x, line.y, 2, 2);

    die(line);
  }
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
