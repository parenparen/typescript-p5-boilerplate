import p5 from 'p5';
require('../assets/index.scss');

type Horizon = number[];

const palette = {
  lavender: '#8956a9',
  poppy: '#fec43e',
  poppy2: '#f96431',
  grass: '#79bb2d',
  sky: '#486faa',
  hill: '#3b3f24'
}

const drawPetal = (
  p: p5, 
  {
    innerPetalScale = 0.8,
    width = 100,
    height = 50,
    rotation = 0,
    color1 = palette.poppy, 
    color2 = palette.poppy2
  } = {}) => {
  const petalOuter = p.color(color1),
    petalInner = p.color(color2);

  p.push()
  p.ellipseMode(p.CORNER);
  p.rotate(rotation);
  p.translate(0, -height / 2);
  petalOuter.setAlpha(250 * 1.0);
  petalInner.setAlpha(200 * 1.0);
  p.fill(petalOuter);
  p.ellipse(0, 0, width, height);
  p.scale(innerPetalScale, innerPetalScale);
  p.fill(petalInner);
  p.translate(
    0,
    (height * (1 - innerPetalScale) / 2) * (1 / innerPetalScale));
  p.ellipse(0, 0, width, height);
  p.pop()
}

const drawStem = (p: p5, 
  {
    height = 100,
    widthTop = 1,
    widthBottom = 5
  } = {}) => {
  const stem = p.color(palette.grass);
  stem.setAlpha(150);

  p.push();
  p.fill(stem);
  p.rotate(Math.PI);
  p.translate(-widthTop / 2, 0);
  p.quad(
    0, 0, 
    widthTop, 0,
    widthBottom, height,
    0, height);
  p.pop();
}

const drawFlower = (p: p5,
  {
    x, y, color1 = palette.poppy, color2 = palette.poppy2,
    horizon 
  } : {x: number, y: number, color1?: string, color2?: string,
       horizon: Horizon}) => {
  let petalCount = 4;
  let noise = 0.5 + p.noise(x, y);
  p.noStroke();
  p.push();

  y = y * noise;
  x = x * noise;

  if(x > horizon.length || y < horizon[Math.floor(x)]) return;

  p.translate(x, y);
  p.rotate(Math.PI);
  p.scale(1 * noise);

  for(let i = 0; i < petalCount; ++i) {
    p.push();
    p.shearX(Math.PI / 4 * (0.5 * noise) * (i % 2 === 0 ? 0 : 1));
    drawPetal(
      p, {
        color1,
        color2,
        rotation: 
          ((Math.PI / (petalCount - 1)) * i * noise), 
        height: 6 * noise,
        width: 6 * noise});
    p.pop();
  }

  drawStem(p, {
    height: 9 * noise, 
    widthTop: 0.8 * noise, 
    widthBottom: 1 * noise});

  p.pop();
}

const drawGrass = (p: p5,
  {x = 0, y = 0, horizon
  } : {x: number, y: number, horizon: Horizon}) => {

  let noise = 0.5 + p.noise(x, y);
  
  x = x * noise;
  y = y * noise;

  if(x > horizon.length || y < horizon[Math.floor(x)]) return;

  p.noStroke();
  p.push();
  p.translate(x, y);
  p.rotate(Math.PI);
  p.scale(1 * noise);

  drawStem(p, {
    height: 9 * noise, 
    widthTop: 0.8 * noise, 
    widthBottom: 1 * noise});

  p.pop();
}

const drawFlowers = (p: p5, horizon: Horizon) => {
  let i = 0, j = 0;

  while(j < window.innerHeight) {
    i = 0;

    while(i < window.innerWidth) {
      drawGrass(p, {x: i, y: j, horizon});
      i += 4;
    }
    j += 4;
  }

  i = 0;
  j = 0;
  while(j < window.innerHeight) {
    i = 0;

    while(i < window.innerWidth) {
      if(p.noise(i, j) > 0.80) {
        drawFlower(p, {
          x: i, y: j, 
          color1: palette.lavender,
          color2: palette.lavender, horizon});
      } else {
        drawFlower(p, {x: i, y: j, horizon});
      }
      i += 13;
    }
    j += 13;
  }

//  for(let i = 0; i < window.innerWidth; i += 15) {
//    for(let j = 0; j < window.innerHeight; j += 15) {
//      if(p.noise(i, j) > 0.80) {
//        drawFlower(p, {
//          x: i, y: j, 
//          color1: palette.lavender,
//          color2: palette.lavender, horizon});
//      } else {
//        drawFlower(p, {x: i, y: j, horizon});
//      }
//    }
//  }
}

const makeHorizon = (p: p5) : Horizon => {
  const horizon = [];

  for(let i = 0; i < window.innerWidth; ++i) {
    horizon.push(
      (window.innerHeight / 4) * p.noise(i / 240) 
      + (window.innerHeight / 4));
  }

  return horizon as Horizon;
}

const drawSky = (p: p5, horizon: Horizon) => {
  p.beginShape();
  p.fill(palette.sky);
  p.noStroke();
  p.vertex(0, 0);
  for(let i = 0; i < horizon.length; ++i) {
    p.vertex(i, horizon[i]);
  }
  p.vertex(window.innerWidth, 0);
  p.endShape(p.CLOSE);
}

const app = () => {
  new p5((p: p5) => {
    p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.background(palette.hill);
      p.noLoop();
    };

    p.draw = () => {
      const horizon = makeHorizon(p);
      drawSky(p, horizon);
      drawFlowers(p, horizon);
    };
  });
};

export default app;
