import type { Line, Strategy } from "../types";
import { die, spawn } from "./line";

let canvas = document.querySelector("canvas");
let ctx = canvas?.getContext("2d");

let lines: Line[] = [];
const padding = 50;
const margin = 20;
const probability = 0.1;

const options = {
  shadowMultiplier: 2.5,
  sinIncrease: ((90 / 180) * Math.PI) / 9,
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
          spawn({
            x,
            y: 0,
            type: "col",
            initialX: x,
            initialY: 0,
            arise: x,
            die: canvas.height,
          })
        );
      }
    }

    // vertical position
    for (var y = margin; y <= canvas.height - margin; y += padding) {
      if (Math.random() < probability) {
        lines.push(
          spawn({
            x: 0,
            y,
            type: "row",
            initialX: 0,
            initialY: y,
            arise: y,
            die: canvas.width,
          })
        );
      }
    }
  }
}
drawCanvas();
//TODO

// let speed = Math.random() * 20;
// let start = 300;
// let c = 0;
function loop() {
  let time = window.requestAnimationFrame(loop);
  if (!ctx || !canvas) return;

  ctx.globalCompositeOperation = "source-over";
  ctx.save();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(0,0,0,alp)".replace("alp", "0.04");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "lighter";
  ctx.restore();

  lines = lines.filter((l) => l.died !== true);
  for (const line of lines) {
    ctx.beginPath();
    ctx.fillRect(line.x, line.y, 2, 2);
    ctx.fillStyle = ctx.shadowColor = "hsl(hue,100%,50%)".replace("hue", time.toString());

    ctx.globalCompositeOperation = "lighter";

    ctx.shadowBlur = Math.random() * options.shadowMultiplier;
    ctx.closePath();

    if (!line.died)
      if (line.strategy) {
        if ("dx" in line.strategy) {
          if (line.type == "row") {
            line.x += 2;
          } else {
            line.y += 2;
          }
        } else if ("counter" in line.strategy) {
          if (line.type === "row") {
            line.y = line.initialY + Math.sin(line.strategy.counter) * 9;
            line.x += 5;
          } else {
            line.x = line.initialX + Math.sin(line.strategy.counter) * 9;
            line.y += 5;
          }

          line.strategy.counter += line.strategy.increase;
        }
      }

    die(line);
  }
}

loop();
