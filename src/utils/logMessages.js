import { greenBold, redUnderlineBold, blue, whiteBold, green, whiteUnderlineBold } from './chalk';

export const mainBannerMessage = () => {
	console.log(`\n\n  🛠  ${greenBold('Creating Application...')}\n`);
};

export const SuccessMessage = () => {
	console.log(`\n  ✅  ${greenBold('DONE')}  Project is ready.\n`);
};

export const cliVersion = (version) => {
	console.log(greenBold(`v${version}`));
};

export const cliHelp = () => {
	console.log(`\n  ${greenBold('Options:')} \n`);
	console.log('  -h, --help           \tprint mf-bootstrap command line options (currently set)');
	console.log('  -i, --install       \tlet the application know if the micro-frontend dependencies will be install. Is set FALSE by default');
	console.log('  -g, --git           \tlet the application know if the micro-frontend application will be initialize with Git. Is set FALSE by default');
	console.log('  -n, --name           \tmicro-frontend application name');
	console.log('  -p, --pManager   \tpackage manager to use, npm (default) or yarn');
	console.log('  -s, --skip          \tparameter to create a micro-frontend application using default values');
	console.log('  -t, --template     \tmicro-frontend type of project, JavaScript (default) or TypeScript');
	console.log('  -v, --version       \tprint mf-bootstrap version');
	console.log(`\n  ${greenBold('Examples:')} \n`);
	console.log(`  ${whiteUnderlineBold('Init Git and install dependencies:')}\n`);
	console.log(`  $> mf-bootstrap -n ${green('myApplication')} -t ${green('JavaScript')} -p ${green('yarn')} --git --install\n`);
	console.log(`  ${whiteUnderlineBold('without git init application and without install dependencies')}\n`);
	console.log(`  $> mf-bootstrap -n ${green('myApplication')} -t ${green('JavaScript')} -p ${green('yarn')}\n`);
	console.log(`  ${whiteUnderlineBold('Default template (JS), default package manager (NPM), no init and no install dependencies:')}\n`);
	console.log(`  $> mf-bootstrap -n ${green('myApplication')}\n`);
	console.log(`  ${whiteUnderlineBold('Use default values:')}\n`);
	console.log('  $> mf-bootstrap --skip\n');
};

export const nodeVersionError = (currentNodeVersion) => {
	console.log();
	console.error(`\t${redUnderlineBold('ERROR')}`);
	console.error(`\n\tYou are running ${greenBold('Node ' + currentNodeVersion)}`);
	console.error(`\t${blue('Micro-Frontend Bootstrap (mf-bootstrap)')} requires ${greenBold('Node 10')} or higher`);
	console.error(`\t${whiteBold('Please update your version of Node.')}`);
	console.log();
	console.log();
};

export default {
	cliHelp,
	cliVersion,
	mainBannerMessage,
	nodeVersionError,
	SuccessMessage,
};
