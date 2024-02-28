export type Line = {
  x: number;
  y: number;
  start: number;
  end: number;
};

export type Shiny = {
  x: number;
  y: number;
  type: "row" | "col";
  points: { x: number; y: number }[];
};
