import inquirer from 'inquirer';
import promptQuestions from './promptQuestions';
import { DEFAULT_NAME, DEFAULT_TEMPLATE } from './constants';

export const promptForMissingOptions = async (options) => {
	const questions = [];

	if (options.skipPrompts) {
		return {
			...options,
			appName: options.appName || DEFAULT_NAME,
			template: options.template || DEFAULT_TEMPLATE,
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
