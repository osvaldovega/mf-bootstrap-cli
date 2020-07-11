import chalkPipe from 'chalk-pipe';
import { validateApplicationName } from './validateName';
import { DEFAULT_NAME, DEFAULT_TEMPLATE } from './constants';

export const appName = {
	type: 'input',
	name: 'appName',
	message: 'What is the project name',
	default: DEFAULT_NAME,
	transformer: (name) => chalkPipe('orange.bold')(name),
	validate: (name) => validateApplicationName(name),
};

export const template = {
	type: 'list',
	name: 'template',
	message: 'Please choose which project template to use',
	choices: ['JavaScript', 'TypeScript'],
	default: DEFAULT_TEMPLATE,
};

export const git = {
	type: 'confirm',
	name: 'git',
	message: 'Initialize a git repository?',
	default: false,
};

export default {
	appName,
	template,
	git,
};
