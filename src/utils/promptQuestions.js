import chalkPipe from 'chalk-pipe';
import { validateApplicationName } from './validateProjectName';
import { DEFAULT_NAME, DEFAULT_TEMPLATE, DEFAULT_PACKAGE_MANAGER } from './constants';

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

export const installDependencies = {
	type: 'confirm',
	name: 'install',
	message: 'Install project dependencies?',
	default: false,
};

export const packageManager = {
	type: 'list',
	name: 'packageManager',
	message: 'Please choose which package manager to use',
	choices: ['npm', 'yarn'],
	default: DEFAULT_PACKAGE_MANAGER,
};

export default {
	appName,
	git,
	installDependencies,
	packageManager,
	template,
};
