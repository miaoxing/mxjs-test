import {createPromise} from '../';

describe('test', () => {
  test('createPromise', async () => {
    const promise = createPromise();
    expect(promise).toBeInstanceOf(Promise);

    promise.resolve('test');

    const result = await promise;
    expect(result).toBe('test');
  });
});
