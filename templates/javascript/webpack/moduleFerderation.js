const { ModuleFilenameHelpers } = require('webpack');

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

/**
 * Array of all the remote applications
 * URLs indicating the module federation file
 * e.g. 'https://www.mfGuest.com/remoteEntry.js'
 */
const remotesURLs = ['https://mydomain.com/remoteEntry.js'];

module.exports = {
	exposes,
	remotes,
	remotesURLs,
};
