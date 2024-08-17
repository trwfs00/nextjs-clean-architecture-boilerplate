module.exports = {
  mutate: ["src/**/*.ts"],
  mutator: "typescript",
  testRunner: "jest",
  jest: { configFile: "jest.config.js" },
  reporters: ["html", "clear-text"],
}
