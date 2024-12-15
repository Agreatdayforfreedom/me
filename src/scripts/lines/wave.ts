import type { Direction } from "../../types";
import { _Line } from "./line";
import { options } from "../options";
import { smoothOscillation } from "../utils";

interface _Wave {
  counter: number;
  increase: number;
  waveLength: number;
}

export class Wave extends _Line implements _Wave {
  counter: number;
  increase: number;
  waveLength: number;

  constructor(
    type: "col" | "row",
    direction: Direction,
    initialX: number,
    initialY: number,
    w: number,
    h: number
  ) {
    let x = initialX;
    let y = initialY;
    let arise = 0,
      die = 0;

    //FIXME: direction should be a class. ?????
    if (direction === "down") {
      y = arise = h;
      die = 0;
      x = initialX;
    }
    if (direction === "up") {
      y = arise = 0;
      die = h;
      x = initialX;
    }
    if (direction === "left") {
      x = arise = 0;
      die = w;
      y = initialY;
    }
    if (direction === "right") {
      x = arise = w;
      die = 0;
      y = initialY;
    }
    let color = options.color.replace(
      "hue",
      Math.floor(Math.random() * 360).toString()
    );

    let dv = direction === "left" || direction === "up" ? 2 : -2;
    let start = Math.random() < 0.1;
    let died = false;
    super(
      x,
      y,
      dv,
      start,
      arise,
      die,
      died,
      color,
      initialX,
      initialY,
      type,
      direction
    );

    this.counter = 0;
    this.increase = ((90 / 180) * Math.PI) / 9;
    this.waveLength = Math.floor(Math.random() * (10 - 3) + 3);
  }

  update(ctx: CanvasRenderingContext2D, time: number): void {
    if (!("counter" in this) || this.died) return;
    if (this.direction === "left") {
      this.y = this.initialY + Math.sin(this.counter) * this.waveLength;
      this.x += this.dv;
    } else if (this.direction === "up") {
      this.x = this.initialX + Math.sin(this.counter) * this.waveLength;
      this.y += this.dv;
    } else if (this.direction === "right") {
      this.y = this.initialY + Math.sin(this.counter) * this.waveLength;
      this.x += this.dv;
    } else if (this.direction === "down") {
      this.x = this.initialX + Math.sin(this.counter) * this.waveLength;
      this.y += this.dv;
    }
    this.counter += this.increase;

    ctx.fillStyle = ctx.shadowColor = this.color
      .replace("saturation", "100")
      .replace("lightness", smoothOscillation(time, 25, 12.5).toString());

    ctx.fillRect(this.x, this.y, 2, 2);
    ctx.shadowBlur = Math.random() * options.shadowMultiplier;

    this.kill();
  }

  kill() {
    if (this.direction === "left") if (this.x > this.die) this.died = true;
    if (this.direction === "right") if (this.x < this.die) this.died = true;
    if (this.direction === "up") if (this.y > this.die) this.died = true;
    if (this.direction === "down") if (this.y < this.die) this.died = true;
  }
}
