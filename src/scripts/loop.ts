import type { Line, Shiny } from "../types";

let canvas = document.querySelector("canvas");
let ctx = canvas?.getContext("2d");

let lines: Line[] = [];
let shiny: Shiny[] = [];
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
    for (var x = 0; x <= canvas.width; x += padding) {
      lines.push({ x, y: 0, start: x, end: canvas.height });
      shiny.push({ x, y: 0, type: "col", points: [{ x, y: 0 }] });
    }

    for (var y = 0; y <= canvas.height; y += padding) {
      shiny.push({ x: 0, y, type: "row", points: [{ x: 0, y }] });
    }
  }
}
drawCanvas();

var increase = (((90 / 180) * Math.PI) / 9) * 0.1;
let counter = 0;
counter += increase;
function loop() {
  let time = window.requestAnimationFrame(loop);
  let c = 0;

  if (!ctx || !canvas) return;
  ctx.globalCompositeOperation = "source-over";
  ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(0,0,0,alp)".replace("alp", "0.04");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "lighter";

  let dy = 2;

  for (const s of shiny) {
    if (ctx) {
      if (s.type == "row") {
        s.y = s.points[0].y - Math.sin(counter);
        s.x += dy;
      } else {
        s.x = s.points[0].x - Math.sin(counter);
        s.y += dy;
      }
      counter += increase;
      Math.sin(s.x * 2 * Math.PI * (1 / 60));
      ctx.beginPath();
      ctx.fillRect(s.x, s.y, 1, 1);
      ctx.shadowColor = "hsl(100,100%,50%)";
      ctx.shadowBlur = 1;
      ctx.fillStyle = "hsl(hue,100%,50%)".replace("hue", time.toString());

      ctx.closePath();
    }
  }
  // for (const l of lines) {
  //   ctx.beginPath();
  //   ctx.moveTo(l.x, l.y);
  //   ctx.lineTo(l.start, l.end);
  //   ctx.strokeStyle = "rgba(255,255,255,0.3";
  //   ctx.shadowBlur = 0;
  //   ctx.lineWidth = 0.1;
  //   ctx.stroke();
  //   ctx.closePath();
  // }
  // });
}

loop();
