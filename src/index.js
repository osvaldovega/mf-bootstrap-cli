'use strict';

const { blue, greenBold, redUnderlineBold, whiteBold } = require('./utils/chalk');
const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const [major] = semver;

if (major < 10) {
	console.log();
	console.error(`\t${redUnderlineBold('ERROR')}`);
	console.error(`\n\tYou are running ${greenBold('Node ' + currentNodeVersion)}`);
	console.error(`\t${blue('Micro-Frontend Bootstrap (mf-bootstrap)')} requires ${greenBold('Node 10')} or higher`);
	console.error(`\t${whiteBold('Please update your version of Node.')}`);
	console.log();
	console.log();

	process.exit(1);
}

require('./cli').cli(process.argv);
