import type { StrategyType } from "../../types";
import { _Line } from "./line";
import { options } from "../options";

export class Folium extends _Line {
  constructor(
    strategy: StrategyType,
    initialX: number,
    initialY: number,
    color: string,
    w: number,
    h: number
  ) {
    const a = Math.floor(Math.random() * (200 - 100) + 100);
    const t = -5;
    // const initialX = posx;
    // const initialY = posy;
    const x = initialX + (3 * a * t) / (1 + Math.pow(t, 3));
    const y = initialY + (3 * a * Math.pow(t, 2)) / (1 + Math.pow(t, 3));

    let dfx = 1;
    let dfy = 1;

    // bottom
    if (initialX + a > w) dfx = -1;
    // top
    else if (initialX - a < 0) dfx = 1;
    // pick random direction
    else dfx = Math.random() < 0.5 ? 1 : -1;
    // right
    if (initialY + a > h) dfy = -1;
    //left
    else if (initialY - a < 0) dfy = 1;
    // same
    else dfy = Math.random() < 0.5 ? 1 : -1;

    super(x, y, 0, false, 0, 0, false, color, initialX, initialY, {
      ...strategy,
      dfx,
      dfy,
      a,
    });
  }

  update(ctx: CanvasRenderingContext2D, time: number): void {
    if (!("t" in this.strategy) || this.died) return;
    this.strategy.inc = Math.abs(Math.cos(this.strategy.lifetime));
    this.strategy.lifetime += 0.01;

    this.x =
      this.initialX +
      (3 * this.strategy.dfx * this.strategy.a * this.strategy.t) /
        (1 + Math.pow(this.strategy.t, 3));
    this.y =
      this.initialY +
      (3 * this.strategy.dfy * this.strategy.a * Math.pow(this.strategy.t, 2)) /
        (1 + Math.pow(this.strategy.t, 3));
    this.strategy.t += this.strategy.inc;

    ctx.fillStyle = ctx.shadowColor = this.color
      .replace("saturation", "100")
      .replace("lightness", "50");

    ctx.fillRect(this.x, this.y, 2, 2);
    ctx.shadowBlur = Math.random() * options.shadowMultiplier;

    this.kill();
  }
}
