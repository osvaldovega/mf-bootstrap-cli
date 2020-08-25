import inquirer from 'inquirer';
import { filterOptions, optionsToPrompt } from './tools';
import { version } from '../../package.json';
import { cliVersion, cliHelp, nodeVersionError } from './logMessages';
import { DEFAULT_NAME, DEFAULT_TEMPLATE, DEFAULT_PACKAGE_MANAGER } from './constants';

/**
 * Validate the NodeJS version to ensure the application
 * will run properly.
 * Node version should be equal or higher than v10
 */
export const validateNodeVersion = () => {
  const currentNodeVersion = process.versions.node;
  const semver = currentNodeVersion.split('.');
  const [major] = semver;

  if (major < 10) {
    nodeVersionError(currentNodeVersion);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

/**
 * Validate that all the necessary options have values
 * in case user didn't provide any.
 * If there are missing values these will be prompt in the
 * terminal to the user.
 * @param {Object} options - All CLI options
 * @return {Object} Option with the values entered by user
 */
export const validateMissingPromptOptions = async (options) => {
  if (options.version) {
    cliVersion(version);
    return;
  }

  if (options.help) {
    cliHelp(version);
    return;
  }

  if (options.skipPrompts) {
    // eslint-disable-next-line consistent-return
    return {
      ...options,
      appName: options.appName || DEFAULT_NAME,
      template: options.template || DEFAULT_TEMPLATE,
      packageManager: options.packageManager || DEFAULT_PACKAGE_MANAGER,
    };
  }

  const filteredOptions = filterOptions(options);
  const questions = optionsToPrompt(filteredOptions);
  const answers = await inquirer.prompt(questions);

  // eslint-disable-next-line consistent-return
  return {
    ...options,
    appName: options.appName || answers.appName,
    git: options.git || answers.git,
    template: options.template || answers.template,
    install: options.install || answers.install,
    packageManager: options.packageManager || answers.packageManager,
  };
};

export default {
  validateMissingPromptOptions,
  validateNodeVersion,
};
