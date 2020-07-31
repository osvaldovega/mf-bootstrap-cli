import inquirer from 'inquirer';
import promptQuestions from './promptQuestions';
import { version } from '../../package.json';
import { cliVersion, cliHelp } from './logMessages';
import { DEFAULT_NAME, DEFAULT_TEMPLATE, DEFAULT_PACKAGE_MANAGER } from './constants';

export const promptForMissingOptions = async (options) => {
	const questions = [];

	if (options.version) {
		cliVersion(version);
		return;
	}

	if (options.help) {
		cliHelp(version);
		return;
	}

	if (options.skipPrompts) {
		return {
			...options,
			appName: options.appName || DEFAULT_NAME,
			template: options.template || DEFAULT_TEMPLATE,
			packageManager: options.packageManager || DEFAULT_PACKAGE_MANAGER,
		};
	}

	if (!options.appName) questions.push(promptQuestions.appName);
	if (!options.template) questions.push(promptQuestions.template);
	if (!options.git) questions.push(promptQuestions.git);
	if (!options.install) questions.push(promptQuestions.installDependencies);
	if (!options.packageManager) questions.push(promptQuestions.packageManager);

	const answers = await inquirer.prompt(questions);

	return {
		...options,
		appName: options.appName || answers.appName,
		git: options.git || answers.git,
		template: options.template || answers.template,
		install: options.install || answers.install,
		packageManager: options.packageManager || answers.packageManager,
	};
};
