import type { Line, Direction, Axis } from "../../types";

export interface __Line extends Line {
  update: (ctx: CanvasRenderingContext2D, time: number) => void;
  kill: () => void;
}

export class _Line implements __Line {
  id: string;
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
    public type: Axis = "col",
    public direction?: Direction
  ) {
    this.id = crypto.randomUUID();
  }

  update(_ctx: CanvasRenderingContext2D, _time: number) {
    throw new Error("Method update(ctx, time): void not implemented.");
  }

  kill() {
    throw new Error("Method kill(): void not implemented.");
  }
}
