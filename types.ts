
export interface SocialLink {
  id: string;
  title: string;
  url: string;
  iconName: string;
  color: string;
}

export interface Star {
  x: number;
  y: number;
  s: number;
}

export interface StarLayer {
  x: number;
  x2: number;
  y: number;
  y2: number; // Added y2 for vertical wrapping
  s: number;
  buffer: HTMLCanvasElement;
}

export interface StarFieldState {
  parallax: boolean;
  parallaxSens: number;
  starDensity: number;
  direction: 'left' | 'right' | 'up' | 'down'; // Added vertical directions
  dx: number;
  cw: number;
  ch: number;
  numStars: number;
  stars: Star[];
  layers: StarLayer[];
  parallaxVal: number;
}
