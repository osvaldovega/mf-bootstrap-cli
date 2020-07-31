import fs from 'fs';
import path from 'path';
import ncp from 'ncp';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import { mainBannerMessage, SuccessMessage } from './logMessage';

const access = promisify(fs.access);
const copy = promisify(ncp);

const checkAccessToTemplateDir = async ({ templateDirectory }) => {
	try {
		await access(templateDirectory, fs.constants.R_OK);
	} catch (err) {
		return Promise.reject(new Error('Missing template files, the select template it is not valid'));
	}
};

const createNewProjectDir = async ({ appName, targetDirectory }) => {
	try {
		await execa('mkdir', [appName], { cwd: targetDirectory });
	} catch (err) {
		return Promise.reject(
			new Error(`Failed to create directory ${appName}, check there is no other directory with the same name`),
		);
	}
};

const copyTemplateFiles = async ({ templateDirectory, targetDirectory, appName }) => {
	try {
		await copy(templateDirectory, path.join(targetDirectory, appName), { clobber: false });
	} catch (error) {
		return Promise.reject(new Error('Failed to copy files to destiny directory'));
	}
};

const initGit = async ({ targetDirectory, appName }) => {
	try {
		await execa('git', ['init'], { cwd: path.join(targetDirectory, appName) });
	} catch (error) {
		return Promise.reject(new Error('Failed to initialize Git'));
	}
};

const installProjectDependencies = async ({ targetDirectory, appName, packageManager }) => {
	try {
		await projectInstall({ cwd: path.join(targetDirectory, appName), prefer: packageManager });
	} catch (error) {
		return Promise.reject(new Error('Error installing project dependencies.'));
	}
};

const runTasks = async (options) => {
	const tasks = new Listr([
		{
			title: 'Checking Project Files.',
			task: () => checkAccessToTemplateDir(options),
		},
		{
			title: 'Creating Project Directory.',
			task: () => createNewProjectDir(options),
		},
		{
			title: 'Coping Project files.',
			task: () => copyTemplateFiles(options),
		},
		{
			title: 'Initializing Git.',
			task: () => initGit(options),
			skip: () => !options.git,
		},
		{
			title: 'Installing Project Dependencies.',
			task: () => installProjectDependencies(options),
			skip: () => !options.install,
		},
	]);

	return tasks.run();
};

export const createProject = async (options) => {
	const newOptions = {
		...options,
		targetDirectory: options.targetDirectory || process.cwd(),
		templateDirectory: path.resolve(__dirname, '../../templates', options.template.toLowerCase()),
	};

	try {
		mainBannerMessage();
		await runTasks(newOptions);
		SuccessMessage();
	} catch (err) {
		console.error();
		process.exit(1);
	}

	return true;
};
