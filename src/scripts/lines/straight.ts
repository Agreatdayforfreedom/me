import type { Direction } from "../../types";
import { _Line } from "./line";
import { options } from "../options";
import { smoothOscillation } from "../utils";

interface _Straight {
  dx: number;
  dy: number;
}

export class Straight extends _Line implements _Straight {
  dx: number;
  dy: number;

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
    }
    if (direction === "up") {
      y = arise = 0;
      die = h;
    }
    if (direction === "left") {
      x = arise = 0;
      die = w;
    }
    if (direction === "right") {
      x = arise = w;
      die = 0;
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

    this.dx = 2;
    this.dy = 2;
  }

  update(ctx: CanvasRenderingContext2D, time: number): void {
    if (this.died) return;
    if (this.direction === "left") {
      this.x += this.dv;
    } else if (this.direction === "up") {
      this.y += this.dv;
    } else if (this.direction === "right") {
      this.x += this.dv;
    } else if (this.direction === "down") {
      this.y += this.dv;
    }

    ctx.fillStyle = ctx.shadowColor = this.color
      .replace("saturation", "100")
      .replace("lightness", smoothOscillation(time, 25, 12.5).toString());

    ctx.fillRect(this.x, this.y, 2, 2);
    ctx.shadowBlur = Math.random() * options.shadowMultiplier;

    if (this.direction === "left") if (this.x > this.die) this.died = true;
    if (this.direction === "right") if (this.x < this.die) this.died = true;
    if (this.direction === "up") if (this.y > this.die) this.died = true;
    if (this.direction === "down") if (this.y < this.die) this.died = true;
  }

  kill() {
    this.died = true;
  }
}
