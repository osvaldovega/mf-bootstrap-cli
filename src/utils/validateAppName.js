import validateProjectName from 'validate-npm-package-name';
import { red, green, redUnderlineBold, white } from './chalk';

/**
 * Validate that name passed it is correct and wont have
 * conflicts with packages names.
 * @param {String} appName - Name entered by user
 */
export const validateApplicationName = (appName) => {
  const validationResult = validateProjectName(appName);

  if (!validationResult.validForNewPackages) {
    console.error(`\n\n\t${redUnderlineBold('ERROR')}`);
    console.error(red('\t==================================='));
    console.error(
      white(
        `\n\tCannot create a project named ${green(appName)} because of npm naming restrictions:\n`,
      ),
    );

    [...(validationResult.errors || []), ...(validationResult.warnings || [])].forEach((error) => {
      console.error(`\t${red(error)}`);
    });

    console.error(white('\n\tPlease choose a different project name.\n'));
    console.error(red('\t===================================\n'));
    return false;
  }

  return true;
};

export default validateApplicationName;
