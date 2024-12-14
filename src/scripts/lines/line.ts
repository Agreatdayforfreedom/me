import type { Line, StrategyType, Direction, Axis } from "../../types";

export interface __Line extends Line {
  update: (ctx: CanvasRenderingContext2D, time: number) => void;
}

export class _Line implements __Line {
  constructor(
    public x: number,
    public y: number,
    public dv: number,
    public start: boolean,
    public arise: number,
    public die: number,
    public died: boolean,
    public color: string,
    public initialX: number,
    public initialY: number,
    public strategy: StrategyType, // todo strategy should be created inside of the class instead of being passed as parameter
    public type: Axis = "col",
    public direction?: Direction
  ) {}

  update(_ctx: CanvasRenderingContext2D, _time: number) {
    throw new Error("Method not implemented.");
  }

  //todo
  kill() {
    if (this.strategy && "lifetime" in this.strategy)
      if (this.strategy.lifetime > 3.5) this.died = true;
    if (this.direction === "left") if (this.x > this.die) this.died = true;
    if (this.direction === "right") if (this.x < this.die) this.died = true;
    if (this.direction === "up") if (this.y > this.die) this.died = true;
    if (this.direction === "down") if (this.y < this.die) this.died = true;
  }
}
