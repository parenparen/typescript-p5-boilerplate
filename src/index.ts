import app from './app';

document.querySelectorAll('canvas').forEach(elem => elem.remove());

app();

if(module.hot) {
  module.hot.accept();
}

