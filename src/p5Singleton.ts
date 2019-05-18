import p5 from 'p5'

export {p5};

interface Cache {
  instance: p5;
}

const cache = {
} as Cache;

new p5((p: p5) => {
  cache.instance = p;
});

export default () => cache.instance;

