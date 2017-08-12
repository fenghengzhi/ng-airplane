import { Object2arrayPipe } from './object2array.pipe';

describe('Object2arrayPipe', () => {
  it('create an instance', () => {
    const pipe = new Object2arrayPipe();
    expect(pipe).toBeTruthy();
  });
});
