const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// Plugin support
const withPlugins = require("next-compose-plugins");

// SVG support for Next.js
const withSvgr = require("next-plugin-svgr");

// Transpile shared code
const withTM = require("next-transpile-modules")([
  "@upwardli/shared",
  "@upwardli/api",
]);

const nextConfig = {
  trailingSlash: true,
};

module.exports = withPlugins([withTM], nextConfig);
