export type Direction = "up" | "down" | "right" | "left";

export enum _Dir {
  UP = 1,
  DOWN = 2,
  LEFT = 3,
  RIGHT = 4,
}
export type Axis = "row" | "col";
export interface Line {
  id: string;
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
  direction?: Direction;
  type: Axis;
}

export type Positions = {
  col: Array<{ x: number; y: number }>;
  row: Array<{ x: number; y: number }>;
};

//----------

export type Project = {
  data_open: string;
  title: string;
  desc: string;
  github_link: string;
  page_link: string;
  img_paths: string[];
  tecnologies: Tecnology[];
};

export type Tecnology = {
  content: string;
  color: string;
};
