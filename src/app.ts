import getP5Singleton, {p5} from './p5Singleton.ts';
require('../assets/index.scss');

const p = getP5Singleton();

const drawSphere = (
  {r = 120, detail = 90, color = p.color("black")} : 
  {r?: number, detail?: number, color?: p5.Color} = {}) => {

  const maxAngleLat = Math.PI;
  const maxAngleLon = Math.PI / 2;
  const radInc = maxAngleLat / detail;
  const radIncLon = maxAngleLon / detail;

  p.noStroke();
  p.fill(color);

  p.push();

  for(let aLon = 0; aLon < maxAngleLon; aLon += radIncLon) {
    for(let aLat = 0; aLat < maxAngleLat; aLat += radInc) {
      const projectedRadius = Math.cos(aLon) * r;
      p.push();
      p.translate(
        Math.cos(aLat) * projectedRadius, 
        Math.sin(aLat) * projectedRadius,
        Math.sin(aLon) * r);
      p.sphere(5);
      p.pop();
    }
  }

  p.pop();
};

const drawWave = (
  {radius = 80} : {radius?: number} = {}) => {

  const colorPrimary = p.color("#d25084");
  const colorSecondary = p.color("#e2ca5f");
  colorPrimary.setAlpha(15);
  colorSecondary.setAlpha(20);

  p.push();
  p.rotateX(Math.PI / 4)
  let radInc = 18,
    sphereCount = 6,
    minRadius = radius - radInc * sphereCount,
    even = false;
  for(let r = radius; r > minRadius; r -= radInc) {
    drawSphere(
      {
        r, 
        detail: 2 * (r / 5.8), 
        color: even ? colorPrimary : colorSecondary});
    even = !even;
  }
  p.pop();
};

const drawWaves = () => {
  const radius = 80,
    waveDim = 10;
  
  p.push();
  p.translate(-window.innerWidth / 2, -window.innerHeight / 2);
  p.translate(-380, -430, -200);
  p.rotateX(Math.PI / 8);

  let even = true;

  for(
    let i = -radius; i < radius * waveDim * 2; i += radius) {

    for(
      let j = even ? 0 : -radius; 
      j < radius * waveDim * 2; 
      j += radius * 2) {

      p.push();
      p.translate(j, i);
      drawWave({radius: radius * 1.4});
      p.pop();
    }

    even = !even;
  }

  p.pop();
};

const app = () => {
  let refresh = !!p.setup;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.background("gray");
    p.noLoop();
  };

  p.draw = () => {
    p.translate(0, 0, -700);
    drawWaves();
  };

  if(refresh) {
    p.clear();
    p.setup();
    p.redraw();
  }
};

export default app;
