import type { Direction, StrategyType } from "../../types";
import { _Line } from "./line";
import { options } from "../options";
import { smoothOscillation } from "../utils";

export class Straight extends _Line {
  constructor(
    type: "col" | "row",
    direction: Direction,
    strategy: StrategyType,
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
      strategy,
      type,
      direction
    );
  }

  update(ctx: CanvasRenderingContext2D, time: number): void {
    if (!("dx" in this.strategy) || this.died) return;
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

    this.kill();
  }
}
