module.exports = {
  roots: ['<rootDir>/src'],
  coveragePathIgnorePatterns: [
    './src/config/*',
    './src/index.js',
    './src/router.js',
    '.src/routes.js',
  ],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.js?$',
  moduleFileExtensions: ['js', 'json', 'node'],
  coverageReporters: ['json', 'lcov', 'text'],
  testEnvironment: 'node',
};
