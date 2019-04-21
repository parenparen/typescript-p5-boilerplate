import p5 from 'p5';
require('../assets/index.scss');

function noise(p: p5, val: number): number {
  return (p.noise(val / 50) - 0.5) * 50;
}

function customNoise0(p: p5, val: number): number {
  return Math.sin(val / 5) * 10;
}

function drawLineWithNoise(p: p5, offset: number, noise: (p: p5, val: number) => number): void {
  for(let i = 0; i < window.innerWidth; ++i) {
    p.circle(i, offset + noise(p, i), 5);
  }
}

const app = () => {
  new p5((p: p5) => {
    p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.background("gray");
      p.noLoop();
    };

    p.draw = () => {
      drawLineWithNoise(p, window.innerHeight / 2, noise);
      drawLineWithNoise(p, window.innerHeight / 4, customNoise0);
      drawLineWithNoise(p, window.innerHeight / 4 * 3, noise);
    };
  });
};

export default app;
