import fs from 'fs';

export function createPromise() {
  let res, rej;

  const promise = new Promise((resolve, reject) => {
    res = (result) => {
      resolve(result);
      return promise;
    };
    rej = (result) => {
      reject(result);
      return promise;
    };
  });

  promise.resolve = res;
  promise.reject = rej;

  return promise;
}

const originalLocation = window.location;

export function setUrl(path) {
  const url = new URL(path, 'http://localhost/');

  delete window.location;
  window.location = {
    pathname: url.pathname,
    href: url.href,
    search: url.search,
  };
}

export function resetUrl() {
  window.location = originalLocation;
}

export function bootstrap() {
  const file = '../../plugins/app/modules/bootstrap.js';
  if (fs.existsSync(file)) {
    // from packages/mxjs-test
    require(file);
  } else {
    // from node_modules/@mxjs/test
    require(__dirname + '/../plugins/app/modules/bootstrap.js');
  }
}
