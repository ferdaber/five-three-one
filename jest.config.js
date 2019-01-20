function getMockFile(path) {
  return `<rootDir>/src/__mocks__/${path}.mock.js`
}

module.exports = {
  modulePaths: ['src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  testURL: 'https://localhost',
  transform: {
    '\\.[tj]sx?$': 'babel-jest',
  },
  moduleNameMapper: {},
}
