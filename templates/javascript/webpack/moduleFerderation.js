const path = require('path');

const APP_DIR = path.join(__dirname, '../src');

/**
 * Object where will be include all
 * components, logic and shared files
 * e.g './Button': 'src/component/Button/index.js'
 */
const exposes = {};

/**
 * Object with the names of remotes files
 * module federation bundle files to include
 * in the application.
 * e.g mfGuest: 'mgGuest'
 */
const remotes = {};

module.exports = {
	exposes,
	remotes,
};
