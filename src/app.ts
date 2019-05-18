import getP5Singleton, {p5} from './p5Singleton.ts';
require('../assets/index.scss');

const p = getP5Singleton();

function noise(val: number): number {
  return (p.noise(val / 50) - 0.5) * 50;
}

function customNoise0(val: number): number {
  return Math.sin(val / 5) * 10;
}

function drawLineWithNoise(
  offset: number, 
  noise: (val: number) => number): void {

  for(let i = 0; i < window.innerWidth; ++i) {
    p.circle(i, offset + noise(i), 5);
  }
}

const app = () => {
  let refresh = !!p.setup;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background("gray");
    p.noLoop();
  };

  p.draw = () => {
    drawLineWithNoise(window.innerHeight / 8, customNoise0);
    drawLineWithNoise(window.innerHeight / 8 * 2, noise);
    drawLineWithNoise(window.innerHeight / 8 * 3, 
      (i) => noise(i) + customNoise0(i));
    drawLineWithNoise(window.innerHeight / 8 * 4, 
      (i) => noise(i) / 8 * customNoise0(i));
  };

  if(refresh) {
    p.clear();
    p.setup();
    p.redraw();
  }
};

export default app;
