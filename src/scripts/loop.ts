import type { Direction, Line } from "../types";
import { die, spawn } from "./line";

let canvas = document.querySelector("canvas");
let ctx = canvas?.getContext("2d");

let lines: Line[] = [];

const options = {
  gap: 50,
  margin: 20,
  probabilityOfArising: 0.1,
  probabilityDirection: 0.5,
  shadowMultiplier: 2.5,
};

function drawCanvas() {
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.background = "#000";
  if (ctx) {
    //horizontal position
    for (var x = options.margin; x <= canvas.width - options.margin; x += options.gap) {
      let direction: Direction = Math.random() < options.probabilityDirection ? "up" : "down";

      if (Math.random() < options.probabilityOfArising) {
        lines.push(spawn("col", direction, x, 0, canvas.width, canvas.height));
      }
    }

    // vertical position
    for (var y = options.margin; y <= canvas.height - options.margin; y += options.gap) {
      let direction: Direction = Math.random() < options.probabilityDirection ? "left" : "right";
      if (Math.random() < options.probabilityOfArising) {
        lines.push(spawn("row", direction, 0, y, canvas.width, canvas.height));
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
            line.y = line.initialY + Math.sin(line.strategy.counter) * 9;
            line.x += line.dv;
          } else if (line.direction === "up") {
            line.x = line.initialX + Math.sin(line.strategy.counter) * 9;
            line.y += line.dv;
          } else if (line.direction === "right") {
            line.y = line.initialY + Math.sin(line.strategy.counter) * 9;
            line.x += line.dv;
          } else if (line.direction === "down") {
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
