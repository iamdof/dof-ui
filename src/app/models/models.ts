export interface Panel {
  bgColor: string;
  left: string;
  top: string;
  width: string;
  height: string;
  opacity: number;
}

export interface Square {
  bgColor: string;
  left: string;
  top: string;
  width: string;
  height: string;
  opacity: number;
}

export interface CoverConfig {
  frequency: Range;
  opacity: Range;
}

export interface PanelConfig {
  frequency: Range;
  colors: string[];
  rows: Range;
  cols: Range;
}

export interface Range {
  min: number;
  max: number;
}

export interface SquareConfig extends PanelConfig {
  rowMultiplier: number;
  colMultiplier: number;
  opacity: Range;
}

export interface Cover {
  opacity: number;
}

export interface LayoutConfig {
  coverConfig?: CoverConfig;
  panelConfig: PanelConfig;
  squareConfig: SquareConfig;
}
