import { createProject } from './utils/createProject';
import { parseArgumentsIntoOptions } from './utils/parseArguments';
import { promptForMissingOptions } from './utils/validateInputValues';

export async function cli(args) {
	const options = parseArgumentsIntoOptions(args);
	const updateOptions = await promptForMissingOptions(options);
	await createProject(updateOptions);
}
