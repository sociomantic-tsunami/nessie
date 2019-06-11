const path = require("path");

const args = require("minimist")(process.argv.slice(2));

// List of allowed environments
const allowedEnvs = ["dev", "dist"];

// Set the correct environment
const env = allowedEnvs.includes(args.env) ? args.env : "dev";
process.env.REACT_WEBPACK_ENV = env;
process.env.BABEL_ENV = args.env === "dist" ? "production" : "development";

module.exports = require(path.join(__dirname, `cfg/${env}`));
