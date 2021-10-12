import {createPromise, resetUrl, setUrl} from '../';

describe('test', () => {
  test('createPromise', async () => {
    const promise = createPromise();
    expect(promise).toBeInstanceOf(Promise);

    promise.resolve('test');

    const result = await promise;
    expect(result).toBe('test');
  });

  test('setUrl', async () => {
    setUrl('/test?query=abc');

    expect(window.location.pathname).toBe('/test');
    expect(window.location.href).toBe('http://localhost/test?query=abc');
    expect(window.location.search).toBe('?query=abc');
    expect(window.location.reload).toBeInstanceOf(Function);

    resetUrl();

    expect(window.location.href).toBe('http://localhost/');
  });
});
