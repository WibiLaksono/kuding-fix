// jest.setup.js
import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';
// atau jika ingin mock:
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);
