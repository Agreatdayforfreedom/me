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
      shiny.push({ x, y: 0, points: [] });
    }
    // for (var y = 0; y <= canvas.height; y += padding) {
    //   let x = 0;
    //   ctx.beginPath();
    //   ctx.moveTo(x, y);
    //   ctx.lineTo(canvas.width, y);
    //   ctx.closePath();
    //   ctx.lineWidth = 0.1;
    //   ctx.strokeStyle = "white";
    //   ctx.stroke();
    //   shiny(0, y);
    // }
  }
}
drawCanvas();

// function shiny(x: number, y: number) {
//   if (ctx) {
//     ctx.beginPath();
//     ctx.arc(x, y, 2, 0, (Math.PI / 2) * 180);
//     ctx.fillStyle = "white";
//     ctx.shadowColor = "white";
//     ctx.shadowBlur = 10;
//     // ctx.shadowBlur = 50;
//     ctx.fill();
//     ctx.closePath();
//   }
// }
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
  // let speed = 5;
  // shiny.forEach((s) => {

  // ctx.clearRect(0, 0, canvas?.width, canvas?.height);

  // let s = shiny[2];
  for (const s of shiny) {
    // let y = Math.sin(s.x * 2 * Math.PI * (1 / 60));
    if (c++ > 1) return;
    if (ctx) {
      // s.y = dy;
      s.x = 180 - Math.sin(counter) * 120;
      s.y += dy;
      counter += increase;
      Math.sin(s.x * 2 * Math.PI * (1 / 60));
      ctx.beginPath();
      ctx.fillRect(s.x - 1.1, s.y, 2, 2);
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
