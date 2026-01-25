import { LogMiddleware } from './log.middleware';

describe('LogMiddleware', () => {
  it('should be defined', () => {
    // @ts-ignore
    expect(new LogMiddleware()).toBeDefined();
  });
});
