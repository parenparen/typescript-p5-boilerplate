import p5 from 'p5';
require('../assets/index.scss');

const app = () => {
  new p5((p: p5) => {
    p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.background("blue");
    };

    p.draw = () => {
      p.rect(
        window.innerWidth / 2 - 25, window.innerHeight / 2 - 25, 50, 
        50);
    };
  });
};

export default app;
