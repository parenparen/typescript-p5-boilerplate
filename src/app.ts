import getP5Singleton from './p5Singleton.ts';
require('../assets/index.scss');

const p = getP5Singleton();

const app = () => {
  let refresh = !!p.setup;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background("blue");
    p.noLoop();
  };

  p.draw = () => {
    p.rect(
      window.innerWidth / 2 - 25, window.innerHeight / 2 - 25, 50, 
      50);
  };

  if(refresh) {
    p.clear();
    p.setup();
    p.redraw();
  }
};

export default app;
