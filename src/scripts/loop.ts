import type { Line } from "../types";
import { die, spawn } from "./line";

let canvas = document.querySelector("canvas");
let ctx = canvas?.getContext("2d");

let lines: Line[] = [];
let test: number[] = [];
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
      if (Math.random() < 0.1) {
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
    }

    // //vertical position
    for (var y = 60; y <= canvas.height - 60 * 2; y += padding) {
      // if (Math.random() < 0.1) {
      lines.push(
        spawn({
          id: crypto.randomUUID(),
          x: 0,
          y,
          type: "row",
          initialX: 0,
          initialY: y,
          arise: y,
          die: canvas.width,
        })
      );
      // }
    }
    console.log("total:", lines.length);
  }
}
drawCanvas();
var increase = ((90 / 180) * Math.PI) / 9;
let speed = Math.random() * 20;
let counter = 0;
counter += increase;
let start = 300;
let c = 0;
function loop() {
  let time = window.requestAnimationFrame(loop);
  if (!ctx || !canvas) return;
  // console.log("total:", lines);
  ctx.globalCompositeOperation = "source-over";
  ctx.save();
  // ctx.beginPath();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(0,0,0,alp)".replace("alp", "0.04");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "lighter";
  // ctx.closePath();
  ctx.restore();

  let dy = 2;
  lines = lines.filter((l) => l.died !== true);
  for (const line of lines) {
    if (!line.died)
      if (ctx) {
        // if (c++ < 1) {

        // }
        // if (line.type === "row") {
        //   line.y = line.initialY + Math.sin(counter) * 15;
        //   line.x += dy;
        // } else {
        //   // line.x = Math.sin(counter) * 15;
        //   // line.y += dy;
        // }
        // counter += increase;
        if (line.type == "row") {
          line.x += 2;
        } else {
          line.y += 2;
        }
      }
    // } else {
    // }
    die(line);

    ctx.beginPath();
    ctx.fillRect(line.x, line.y, 1, 1);
    ctx.shadowColor = "hsl(100,100%,50%)";
    ctx.shadowBlur = 1;
    ctx.fillStyle = "hsl(hue,100%,50%)".replace("hue", time.toString());
    ctx.closePath();
  }
}

loop();
