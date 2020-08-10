import chalkPipe from 'chalk-pipe';
import { validateApplicationName } from './validateAppName';
import { DEFAULT_NAME, DEFAULT_TEMPLATE, DEFAULT_PACKAGE_MANAGER } from './constants';

const appName = {
	type: 'input',
	name: 'appName',
	message: 'What is the project name',
	default: DEFAULT_NAME,
	transformer: (name) => chalkPipe('orange.bold')(name),
	validate: (name) => validateApplicationName(name),
};

const template = {
	type: 'list',
	name: 'template',
	message: 'Please choose which project template to use',
	choices: ['JavaScript', 'TypeScript'],
	default: DEFAULT_TEMPLATE,
};

const git = {
	type: 'confirm',
	name: 'git',
	message: 'Initialize a git repository?',
	default: true,
};

const install = {
	type: 'confirm',
	name: 'install',
	message: 'Install project dependencies?',
	default: true,
};

const packageManager = {
	type: 'list',
	name: 'packageManager',
	message: 'Please choose which package manager to use',
	choices: ['npm', 'yarn'],
	default: DEFAULT_PACKAGE_MANAGER,
};

export default {
	appName,
	git,
	install,
	packageManager,
	template,
};
