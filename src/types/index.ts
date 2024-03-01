export type Direction = "up" | "down" | "right" | "left";
export type Axis = "row" | "col";
export type Line = {
  x: number;
  y: number;
  dv: number;
  start: boolean;
  arise: number;
  die: number;
  died?: boolean;
  color: string;
  initialX: number;
  initialY: number;
  strategy?: Lineal | Sin;
  direction: Direction;
  type: Axis;
};

export type Positions = {
  col: Array<{ x: number; y: number }>;
  row: Array<{ x: number; y: number }>;
};

export type StrategyType = Lineal | Sin;

export type Strategy = {
  sin: Sin;
  lineal: Lineal;
};

type Sin = {
  increase: number;
  counter: number;
};

export type Lineal = {
  dx: number;
  dy: number;
};
