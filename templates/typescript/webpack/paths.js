const { join, resolve } = require('path');

// Set paths
const APP_DIR = resolve(process.cwd(), 'src');
const BUILD_DIR = resolve(process.cwd(), 'dist');
const PUBLIC_PATH = resolve(process.cwd(), 'public');
const ASSETS_PATH = resolve(process.cwd(), 'src/assets');

// Set functions
const includePathFromSrc = (relativePath) => join(APP_DIR, relativePath);
const includePathFromPublic = (relativePath) => join(PUBLIC_PATH, relativePath);
const includePathFromAssets = (relativePath) => join(ASSETS_PATH, relativePath);
const includePathFromDist = (relativePath) => join(BUILD_DIR, relativePath);

module.exports = {
	APP_DIR,
	BUILD_DIR,
	PUBLIC_PATH,
	ASSETS_PATH,
	includePathFromSrc,
	includePathFromPublic,
	includePathFromAssets,
	includePathFromDist,
};
