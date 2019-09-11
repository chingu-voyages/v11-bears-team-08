module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', 'client/'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js', '!src/models/*.js']
}
