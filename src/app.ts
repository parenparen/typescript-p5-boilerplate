import getP5Singleton, {p5} from './p5Singleton.ts';
require('../assets/index.scss');

const p = getP5Singleton();

const drawSphere = (
  {r = 120, detail = 90, color = p.color("black")} : 
  {r?: number, detail?: number, color?: p5.Color} = {}) => {

  const maxAngleLat = 2 * Math.PI,
    maxAngleLon = 2 * Math.PI,
    radInc = maxAngleLat / detail,
    radIncLon = maxAngleLon / detail;

  p.noStroke();

  p.push();

  for(let aLon = 0; aLon < maxAngleLon; aLon += radIncLon) {
    for(let aLat = 0; aLat < maxAngleLat; aLat += radInc) {
      const projectedRadius = Math.cos(aLon) * r,
        x = Math.cos(aLat) * projectedRadius, 
        y = Math.sin(aLat) * projectedRadius,
        z = Math.sin(aLon) * r;

      const noiseParamDenom = 50;
      const alphaNoiseParamDenom = 5;
      const translationNoise = -25 + 
        p.noise(
          x / noiseParamDenom, 
          y / noiseParamDenom, 
          z / noiseParamDenom)
        * 50;
      const alphaNoise = -2 + 
        p.noise(
          x / alphaNoiseParamDenom, 
          y / alphaNoiseParamDenom, 
          z / alphaNoiseParamDenom)
        * 4;

      color.setAlpha(4 + alphaNoise);
      p.fill(color);

      p.push();
      p.translate(
        x + translationNoise, 
        y + translationNoise, 
        z + translationNoise);
      p.sphere(1, 5);
      p.pop();
    }
  }

  p.pop();
};

const drawWave = (
  {radius = 80} : {radius?: number} = {}) => {

  const colorPrimary = p.color("#d25084");
  const colorSecondary = p.color("#e2ca5f");

  p.push();
  let radInc = 18,
    sphereCount = 4,
    minRadius = radius - radInc * sphereCount,
    even = false;
  for(let r = radius; r > minRadius; r -= radInc) {
    drawSphere(
      {
        r, 
        detail: 2 * (r / 0.6), 
        color: even ? colorPrimary : colorSecondary});
    even = !even;
  }
  p.pop();
};

const drawWaves = () => {
  p.translate(-window.innerWidth / 2, 0);

  const waveCount = 3;

  p.translate(window.innerWidth / (waveCount * 2), 0);

  for(let i = 0; i < waveCount; ++i) {
    drawWave({radius: 70});
    p.translate(window.innerWidth / waveCount, 0);
  }
};

const app = () => {
  let refresh = !!p.setup;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.background("black");
    p.noLoop();
  };

  p.draw = () => {
    drawWaves();
  };

  if(refresh) {
    p.clear();
    p.setup();
    p.redraw();
  }
};

export default app;
