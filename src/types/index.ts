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
  strategy?: StrategyType;
  direction?: Direction;
  type: Axis;
};

export type Positions = {
  col: Array<{ x: number; y: number }>;
  row: Array<{ x: number; y: number }>;
};

export type StrategyType = Lineal | Sin | FoliumOfDescartes;

export type Strategy = {
  sin: Sin;
  lineal: Lineal;
  folium_of_descartes: FoliumOfDescartes;
};

type FoliumOfDescartes = {
  a: number;
  t: number;
  inc: number;
  lifetime: number;
  dfx: number;
  dfy: number;
};

type Sin = {
  increase: number;
  counter: number;
  waveLength: number;
};

export type Lineal = {
  dx: number;
  dy: number;
};

//----------

export type Project = {
  title: string;
  desc: string;
  github_link: string;
  page_link: string;
  tecnologies: Tecnology[];
};

export type Tecnology = {
  content: string;
  color: string;
};
