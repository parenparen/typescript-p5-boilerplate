import getP5Singleton from './p5Singleton.ts';
require('../assets/index.scss');

const p = getP5Singleton();

function noise(val: number): number {
  return (p.noise(val / 100) - 0.5) * 50;
}

function customNoise0(val: number): number {
  return Math.sin(val / 20) * 9;
}

function customRandom(val: number): number {
  return 20 * Math.pow(p.random(-1, 1), 1 / 9);
}

function drawLineWithNoise(
  offset: number, 
  noise: (val: number) => number): void {

  for(let i = 0; i < window.innerWidth; i += 1) {
    p.circle(i, offset + noise(i), 3);
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
    drawLineWithNoise(window.innerHeight / 8 * 5, 
      (i) => -Math.abs(noise(i) / 4 * customNoise0(i)));
    drawLineWithNoise(window.innerHeight / 8 * 6,
      customRandom); 
  };

  if(refresh) {
    p.clear();
    p.setup();
    p.redraw();
  }
};

export default app;
