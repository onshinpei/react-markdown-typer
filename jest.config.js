export default {
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': [
      'babel-jest',
      {
        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mjs'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testMatch: ['<rootDir>/test/**/*.test.(ts|tsx|js|jsx)'],
  // Many markdown ecosystem packages ship ESM-only.
  // Transform all dependencies in tests to avoid brittle allow-lists.
  transformIgnorePatterns: [],
};
