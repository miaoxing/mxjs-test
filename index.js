import $, {Ret} from 'miaoxing';
import {req, url} from '@mxjs/app';
import axios from '@mxjs/axios';

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
    hash: url.hash,
    host: url.host,
    hostname: url.hostname,
    href: url.href,
    origin: url.origin,
    pathname: url.pathname,
    port: url.port,
    protocol: url.protocol,
    search: url.search,
    reload: () => {
    },
  };
}

export function resetUrl() {
  window.location = originalLocation;
}

export function bootstrap() {
  $.http = (...args) => axios(...args).then(res => {
    res.ret = new Ret(res.data);
    return res;
  });
  $.req = req.get.bind(req);
  $.url = url.to.bind(url);
  $.apiUrl = url.api.bind(url);
}
