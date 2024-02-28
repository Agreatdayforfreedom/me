export type Line = {
  id: string;
  x: number;
  y: number;
  start: boolean;
  arise: number;
  die: number;
  died?: boolean;
  initialX: number;
  initialY: number;
  type: "row" | "col";
};
