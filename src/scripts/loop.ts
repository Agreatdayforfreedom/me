import type { Line } from "../types";
import { die, spawn } from "./line";

let canvas = document.querySelector("canvas");
let ctx = canvas?.getContext("2d");

let lines: Line[] = [];
const padding = 50;
const margin = 20;
const probability = 1;

const options = {
  shadowMultiplier: 2.5,
};

function drawCanvas() {
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.background = "#000";
  if (ctx) {
    //horizontal position
    for (var x = margin; x <= canvas.width - margin; x += padding) {
      if (Math.random() < probability) {
        lines.push(
          // spawnBy("col", x, 0)
          spawn("col", "up", x, 0, canvas.width, canvas.height)
          // spawn({
          //   x,
          //   y: canvas.height,
          //   type: "col",
          //   initialX: x,
          //   initialY: canvas.height,
          //   arise: x,
          //   die: 0,
          //   direction: "down",
          // })
        );
      }
    }

    // vertical position
    for (var y = margin; y <= canvas.height - margin; y += padding) {
      if (Math.random() < probability) {
        lines.push(
          spawn("row", "right", 0, y, canvas.width, canvas.height)

          // spawn({
          //   x: 0,
          //   y,
          //   type: "row",
          //   initialX: 0,
          //   initialY: y,
          //   arise: y,
          //   die: canvas.width,
          //   direction: "left",
          // })
        );
      }
    }
  }
}
drawCanvas();

function loop() {
  let time = window.requestAnimationFrame(loop);
  if (!ctx || !canvas) return;

  ctx.globalCompositeOperation = "source-over";
  ctx.save();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(0,0,0,alp)".replace("alp", "0.04");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  ctx.globalCompositeOperation = "lighter";

  lines = lines.filter((l) => l.died !== true);
  for (const line of lines) {
    ctx.beginPath();
    ctx.fillRect(line.x, line.y, 2, 2);
    ctx.fillStyle = ctx.shadowColor = "hsl(hue,100%,50%)".replace("hue", time.toString());

    ctx.shadowBlur = Math.random() * options.shadowMultiplier;
    ctx.closePath();
    if (!line.died)
      if (line.strategy) {
        if ("dx" in line.strategy) {
          // lineal
          //todo
          if (line.type == "row") {
            line.x += line.dv;
          } else {
            line.y += line.dv;
          }
        } else if ("counter" in line.strategy) {
          // sin
          if (line.type === "row") {
            line.y = line.initialY + Math.sin(line.strategy.counter) * 9;
            line.x += line.dv;
          } else {
            line.x = line.initialX + Math.sin(line.strategy.counter) * 9;
            line.y += line.dv;
          }

          line.strategy.counter += line.strategy.increase;
        }
      }

    die(line);
  }
}

loop();
