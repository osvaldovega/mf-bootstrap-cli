const { join, resolve } = require('path');

// Set paths
const APP_DIR = resolve(__dirname, '../src');
const BUILD_DIR = resolve(__dirname, '../dist');
const PUBLIC_PATH = resolve(__dirname, '../public');
const STATIC_PATH = resolve(__dirname, '../assets');

// Set functions
const includePathFromSrc = (relativePath) => join(APP_DIR, relativePath);
const includePathFromPublic = (relativePath) => join(PUBLIC_PATH, relativePath);
const includePathFromStatic = (relativePath) => join(STATIC_PATH, relativePath);
const includePathFromDist = (relativePath) => join(BUILD_DIR, relativePath);

module.exports = {
	APP_DIR,
	BUILD_DIR,
	PUBLIC_PATH,
	STATIC_PATH,
	includePathFromSrc,
	includePathFromPublic,
	includePathFromStatic,
	includePathFromDist,
};
