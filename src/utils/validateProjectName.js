import validateProjectName from 'validate-npm-package-name';
const { red, green, redUnderlineBold, white } = require('./chalk');

// TODO - This function needs to be refactor
export const validateApplicationName = (appName) => {
	const validationResult = validateProjectName(appName);

	if (!validationResult.validForNewPackages) {
		console.error(`\n\n\t${redUnderlineBold('ERROR')}`);
		console.error(red('\t==================================='));
		console.error(
			white(`\n\tCannot create a project named ${green(`"${appName}"`)} because of npm naming restrictions:\n`),
		);

		[...(validationResult.errors || []), ...(validationResult.warnings || [])].forEach((error) => {
			console.error(red(`\t* ${error}`));
		});

		console.error(white('\n\tPlease choose a different project name.\n'));
		console.error(red('\t===================================\n'));
		return false;
	}

	// TODO: there should be a single place that holds the dependencies
	// const dependencies = ['react', 'react-dom', 'react-scripts'].sort();

	// if (dependencies.includes(appName)) {
	// 	console.error(
	// 		red(
	// 			`Cannot create a project named ${green(
	// 				`"${appName}"`,
	// 			)} because a dependency with the same name exists.\n` +
	// 				`Due to the way npm works, the following names are not allowed:\n\n`,
	// 		) +
	// 			cyan(dependencies.map((depName) => `  ${depName}`).join('\n')) +
	// 			red('\n\nPlease choose a different project name.'),
	// 	);
	// 	process.exit(1);
	// }

	return true;
};
