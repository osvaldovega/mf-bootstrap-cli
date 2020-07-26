'use strict';

const { validateNodeVersion } = require('./utils/validateNodeVersion');

validateNodeVersion();

require('./cli').cli(process.argv);
