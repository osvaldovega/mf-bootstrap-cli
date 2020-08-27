const { includePathFromSrc } = require('./paths');

/**
 * Object where will be include all
 * components, logic and shared files
 * e.g './Button': includePathFromSrc('component/Button/index.js')
 */
const exposes = {};

/**
 * Object with the names of remotes files
 * module federation bundle files to include
 * in the application.
 * e.g <remote name>: '<MF_NAME>@http://localhost:<PORT>/static/remoteEntry.js'
 * e.g mfRemote: 'mfRemote@http://localhost:3002/static/remoteEntry.js'
 */
const remotes = {};

module.exports = {
  exposes,
  remotes,
};
