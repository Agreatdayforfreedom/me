import type { Line } from "../types";
import { die, spawn } from "./line";

let canvas = document.querySelector("canvas");
let ctx = canvas?.getContext("2d");

let lines: Line[] = [];
function drawCanvas() {
  if (!canvas) return;

  canvas.style.background = "#000";

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const padding = 60;
  if (ctx) {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";

    //horizontal position
    for (var x = 0; x <= canvas.width; x += padding) {
      lines.push(
        spawn({
          id: crypto.randomUUID(),
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

    //vertical position
    for (var y = 0; y <= canvas.height; y += padding) {
      lines.push({
        id: crypto.randomUUID(),
        x: 0,
        y,
        type: "row",
        initialX: 0,
        initialY: y,
        start: Math.random() < 0.1,
        arise: y,
        die: canvas.width,
      });
    }
  }
}
drawCanvas();
var increase = ((90 / 180) * Math.PI) / 9;
let speed = Math.random() * 20;
let counter = 0;
counter += increase;
let start = 300;
function loop() {
  let time = window.requestAnimationFrame(loop);

  if (!ctx || !canvas) return;
  ctx.globalCompositeOperation = "source-over";
  ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(0,0,0,alp)".replace("alp", "0.04");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "lighter";

  let dy = 2;

  for (const line of lines) {
    if (!line.died)
      if (ctx && line.start) {
        if (line.type === "row") {
          line.y = line.initialY - Math.sin(counter) * 15;
          line.x += dy;
        } else {
          line.x = line.initialX - Math.sin(counter) * 15;
          line.y += dy;
        }
        counter += increase;
      } else {
        if (line.type == "row") {
          line.x += 2;
        } else {
          line.y += 2;
        }
      }
    die(line);
    if (line.died) {
      lines = lines.filter((l) => l.id !== line.id);
    }

    ctx.beginPath();
    ctx.fillRect(line.x, line.y, 1, 1);
    ctx.shadowColor = "hsl(100,100%,50%)";
    ctx.shadowBlur = 1;
    ctx.fillStyle = "hsl(hue,100%,50%)".replace("hue", time.toString());

    ctx.closePath();
  }
}

loop();
