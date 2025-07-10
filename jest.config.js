const dotenv = require("dotenv");
dotenv.config({ path: ".env.development" });

const nextJext = require("next/jest");

const createJestConfig = nextJext({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
