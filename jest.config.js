module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js'
  ],
  coveragePathIgnorePatterns: [
    'package.json',
    'package-lock.json'
  ],
  setupFiles: [
    '<rootDir>/testEnv.js'
  ],
  testPathIgnorePatterns: [
    'mocks.js'
  ],
  testEnvironment: 'node'
}
