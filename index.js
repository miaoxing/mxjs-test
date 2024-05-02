import $, {Ret} from 'miaoxing';
import {req, url, history} from '@mxjs/app';
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
const originalHistoryLocation = history.location;

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
  history.location = window.location;
}

export function resetUrl() {
  window.location = originalLocation;
  history.location = originalHistoryLocation;
}

export function bootstrap() {
  // TODO 统一配置
  if (window.miaoxing !== 'undefined' && window.miaoxing.apiRewrite) {
    url.setOption('apiRewrite', window.miaoxing.apiRewrite);
  }

  $.http = (...args) => axios(...args).then(res => {
    res.ret = new Ret(res.data);
    return res;
  });
  $.req = req.get.bind(req);
  $.url = url.to.bind(url);
  $.apiUrl = url.api.bind(url);

  $.to = (url, options) => {
    if (typeof url === 'number') {
      return history.go(url);
    }

    // Generate full URL, if it is not an absolute URL
    if (url.substring(0, 1) !== '/') {
      url = $.url(url);
    }

    if (options?.replace) {
      return window.location.replace(url);
    }
    return window.location.href = url;
  };
}
