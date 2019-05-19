import getP5Singleton from './p5Singleton.ts';
require('../assets/index.scss');

const p = getP5Singleton();

function drawSpiral0({cx, cy} : {cx: number, cy: number}): void {
  let maxRadians = 10 * Math.PI,
    r = 1;
  for(let a = 0; a < maxRadians; a += Math.PI / 150) {
    r += 0.1;
    p.circle(
      cx + r * Math.cos(a), 
      cy + r *  Math.sin(a), 5);
  }
}

function drawSpiral1({cx, cy} : {cx: number, cy: number}): void {
  let maxRadians = 10 * Math.PI,
    r = 5;
  for(let a = 0; a > -maxRadians; a -= Math.PI / 150) {
    p.circle(
      cx + r * a * Math.cos(a), 
      cy + r * a * Math.sin(a), 5);
  }
}

const app = () => {
  let refresh = !!p.setup;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background("blue");
    p.noLoop();
  };

  p.draw = () => {
    drawSpiral0(
      {cx: window.innerWidth / 4 * 3, cy: window.innerHeight / 2});
    drawSpiral1(
      {cx: window.innerWidth / 4 * 1, cy: window.innerHeight / 2});
  };

  if(refresh) {
    p.clear();
    p.setup();
    p.redraw();
  }
};

export default app;
