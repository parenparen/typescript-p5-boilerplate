import getP5Singleton, {p5} from './p5Singleton.ts';
require('../assets/index.scss');

const p = getP5Singleton();

function drawSpiral0({cx, cy} : {cx: number, cy: number}): void {
  let maxRadians = 7 * Math.PI,
    r = 1;
  for(let a = 0; a < maxRadians; a += Math.PI / 150) {
    r += 0.05;
    p.circle(
      cx + r * Math.cos(a), 
      cy + r *  Math.sin(a), 2);
  }
}

function drawSpiral2({
    cx, 
    cy,
    radiusStep = 0.05,
    alpha = 100,
    startingAngle = 0
  } : {
    cx: number, 
    cy: number, 
    radiusStep?: number,
    alpha?: number,
    startingAngle?: number
  }): void {

  const color = p.color("black");
  let maxRadians = 6 * Math.PI + startingAngle,
    r = 0;

  color.setAlpha(alpha);
  p.fill(color);

  for(let a = startingAngle; a < maxRadians; a += Math.PI / 550) {
    r += radiusStep;

    const thisRadius =
      r + (p.noise(startingAngle * 100 + r / 5) * 100 - 50);

    p.circle(
      cx + thisRadius * Math.cos(a), 
      cy + thisRadius * Math.sin(a), 2);
  }
}

const drawSpirals = () => {
  const cx = window.innerWidth / 2,
    cy = window.innerHeight / 2;

  for(let i = 0; i < 40; ++i) {
    drawSpiral2({
      cx, 
      cy, 
      startingAngle: p.noise(i) * 2 * Math.PI,
      alpha: p.noise(i) * 50
    });
  }
}

const app = () => {
  let refresh = !!p.setup;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background("white");
    p.noLoop();
  };

  p.draw = () => {
    p.noStroke();
    drawSpirals();
  };

  if(refresh) {
    p.clear();
    p.setup();
    p.redraw();
  }
};

export default app;
